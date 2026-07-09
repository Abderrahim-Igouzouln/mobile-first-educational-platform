import { useState, useEffect } from 'react';
import { Paths, Directory, File } from 'expo-file-system';
import * as AsyncStorage from '../../../core/storage/asyncStorage';
import { apiClient } from '../../../core/api/apiClient';
import type { DownloadState, Course } from '../courses.types';

const DOWNLOADS_KEY = '@deveduforge/downloads';

interface ManifestLesson {
  lessonId: string;
  title: string;
  contentMarkdown: string;
  order: number;
  durationMin: number;
}

interface ManifestCourse {
  courseId: string;
  courseTitle: string;
  technologyName: string;
  lastUpdated: string;
  lessons: ManifestLesson[];
}

interface ManifestResponse {
  manifest: ManifestCourse[];
  generatedAt: string;
}

function getCourseDir(courseId: string): Directory {
  return new Directory(Paths.document, 'downloads', courseId);
}

function getManifestFile(courseId: string): File {
  return new File(getCourseDir(courseId), 'manifest.json');
}

class DownloadManager {
  private downloads: Map<string, DownloadState> = new Map();
  private listeners: Set<() => void> = new Set();

  private notify() {
    this.listeners.forEach((l) => l());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  getState(courseId: string): DownloadState | undefined {
    return this.downloads.get(courseId);
  }

  getAllStates(): DownloadState[] {
    return Array.from(this.downloads.values());
  }

  async startDownload(course: Course) {
    const existing = this.downloads.get(course.id);
    if (existing && (existing.status === 'downloading' || existing.status === 'completed')) {
      return;
    }

    const state: DownloadState = {
      courseId: course.id,
      status: 'downloading',
      progress: 0,
      totalSize: 0,
      downloadedSize: 0,
    };

    this.downloads.set(course.id, state);
    this.notify();
    await this.persist();

    try {
      const response = await apiClient.get<{ success: boolean; data: ManifestResponse }>('/offline/manifest');
      const manifestCourse = response.data.data.manifest.find(m => m.courseId === course.id);
      if (!manifestCourse) throw new Error('Course not found in manifest');

      const content = JSON.stringify(manifestCourse, null, 2);
      const totalSize = content.length;

      this.downloads.set(course.id, {
        ...state,
        totalSize,
        progress: 10,
      });
      this.notify();

      const dir = getCourseDir(course.id);
      if (!dir.exists) {
        dir.create({ intermediates: true });
      }

      const file = getManifestFile(course.id);
      file.write(content);

      this.downloads.set(course.id, {
        courseId: course.id,
        status: 'completed',
        progress: 100,
        totalSize,
        downloadedSize: totalSize,
      });
      this.notify();
      await this.persist();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Download failed';
      this.downloads.set(course.id, {
        ...state,
        status: 'error',
        error: errorMessage,
      });
      this.notify();
      await this.persist();
    }
  }

  async removeDownload(courseId: string) {
    try {
      const dir = getCourseDir(courseId);
      if (dir.exists) {
        dir.delete();
      }
    } catch {
      // Silently fail file deletion
    }
    this.downloads.delete(courseId);
    this.notify();
    await this.persist();
  }

  async loadDownloadedCourse(courseId: string): Promise<ManifestCourse | null> {
    try {
      const file = getManifestFile(courseId);
      if (!file.exists) return null;
      const content = await file.text();
      return JSON.parse(content) as ManifestCourse;
    } catch {
      return null;
    }
  }

  getStorageUsage(): { totalSize: number; courseCount: number } {
    const completed = Array.from(this.downloads.values()).filter(
      (d) => d.status === 'completed',
    );
    return {
      totalSize: completed.reduce((sum, d) => sum + d.totalSize, 0),
      courseCount: completed.length,
    };
  }

  private async persist() {
    try {
      const data = Array.from(this.downloads.values());
      await AsyncStorage.setItem(DOWNLOADS_KEY, data as unknown as Record<string, unknown>);
    } catch {
      // Silently fail persistence
    }
  }

  async load() {
    try {
      new Directory(Paths.document, 'downloads').create({ intermediates: true });
    } catch {
      // Silently fail directory creation
    }

    try {
      const raw = await AsyncStorage.getItem<string>(DOWNLOADS_KEY);
      if (raw) {
        const data: DownloadState[] = JSON.parse(raw);
        data.forEach((d) => this.downloads.set(d.courseId, d));
        this.notify();
      }
    } catch {
      // Silently fail loading
    }
  }
}

export const downloadManager = new DownloadManager();

export const useDownloadState = (courseId: string) => {
  const [state, setState] = useState<DownloadState | undefined>(
    downloadManager.getState(courseId),
  );

  useEffect(() => {
    const unsub = downloadManager.subscribe(() => {
      setState(downloadManager.getState(courseId));
    });
    downloadManager.load();
    return unsub;
  }, [courseId]);

  return state;
};

export const useAllDownloads = () => {
  const [states, setStates] = useState<DownloadState[]>(
    downloadManager.getAllStates(),
  );

  useEffect(() => {
    const unsub = downloadManager.subscribe(() => {
      setStates(downloadManager.getAllStates());
    });
    downloadManager.load();
    return unsub;
  }, []);

  return states;
};

export const useStorageUsage = () => {
  const [usage, setUsage] = useState(downloadManager.getStorageUsage());

  useEffect(() => {
    const unsub = downloadManager.subscribe(() => {
      setUsage(downloadManager.getStorageUsage());
    });
    return unsub;
  }, []);

  return usage;
};
