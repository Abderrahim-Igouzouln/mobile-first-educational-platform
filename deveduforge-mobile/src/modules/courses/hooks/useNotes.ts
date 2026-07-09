import { useState, useEffect, useCallback } from 'react';
import * as AsyncStorage from '../../../core/storage/asyncStorage';
import type { Note } from '../courses.types';

const NOTES_KEY = '@deveduforge/notes';

const generateId = () => `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const useNotes = (lessonId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(`${NOTES_KEY}_${lessonId}`);
      if (raw) {
        setNotes(JSON.parse(raw));
      } else {
        setNotes([]);
      }
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  const saveNote = useCallback(
    async (content: string) => {
      const newNote: Note = {
        id: generateId(),
        lessonId,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        syncStatus: 'local',
      };

      const updated = [...notes, newNote];
      setNotes(updated);
      await AsyncStorage.setItem(`${NOTES_KEY}_${lessonId}`, JSON.stringify(updated));
      return newNote;
    },
    [lessonId, notes],
  );

  const updateNote = useCallback(
    async (noteId: string, content: string) => {
      const updated = notes.map((n) =>
        n.id === noteId
          ? { ...n, content, updatedAt: new Date().toISOString(), syncStatus: 'pending' as const }
          : n,
      );
      setNotes(updated);
      await AsyncStorage.setItem(`${NOTES_KEY}_${lessonId}`, JSON.stringify(updated));
    },
    [lessonId, notes],
  );

  const deleteNote = useCallback(
    async (noteId: string) => {
      const updated = notes.filter((n) => n.id !== noteId);
      setNotes(updated);
      await AsyncStorage.setItem(`${NOTES_KEY}_${lessonId}`, JSON.stringify(updated));
    },
    [lessonId, notes],
  );

  const syncNotes = useCallback(async () => {
    const pending = notes.filter((n) => n.syncStatus === 'pending');
    if (pending.length === 0) return;

    const synced = notes.map((n) =>
      n.syncStatus === 'pending' ? { ...n, syncStatus: 'synced' as const } : n,
    );
    setNotes(synced);
    await AsyncStorage.setItem(`${NOTES_KEY}_${lessonId}`, JSON.stringify(synced));
  }, [lessonId, notes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return { notes, loading, saveNote, updateNote, deleteNote, syncNotes, reload: loadNotes };
};
