export interface SyncManifest {
  courses: SyncCourseManifest[];
}

export interface SyncCourseManifest {
  courseId: string;
  checksum: string;
  sizeBytes: number;
  lastUpdated: string;
}

export interface DeltaResponse {
  changes: unknown[];
  timestamp: string;
}

export interface SyncPushRequest {
  actions: SyncAction[];
}

export interface SyncAction {
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
  clientId: string;
}
