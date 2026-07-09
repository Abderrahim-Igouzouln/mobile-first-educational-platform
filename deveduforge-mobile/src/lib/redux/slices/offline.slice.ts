import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PendingAction {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
}

interface OfflineState {
  syncQueue: PendingAction[];
  isOnline: boolean;
}

const initialState: OfflineState = {
  syncQueue: [],
  isOnline: true,
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    addToSyncQueue(state, action: PayloadAction<Omit<PendingAction, 'id' | 'timestamp'>>) {
      state.syncQueue.push({
        ...action.payload,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        timestamp: Date.now(),
      });
    },
    removeFromSyncQueue(state, action: PayloadAction<string>) {
      state.syncQueue = state.syncQueue.filter((item) => item.id !== action.payload);
    },
    clearSyncQueue(state) {
      state.syncQueue = [];
    },
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    reorderSyncQueue(state, action: PayloadAction<string[]>) {
      const idOrder = action.payload;
      const queueMap = new Map(state.syncQueue.map((item) => [item.id, item]));
      state.syncQueue = idOrder.map((id) => queueMap.get(id)!).filter(Boolean);
    },
  },
});

export const {
  addToSyncQueue,
  removeFromSyncQueue,
  clearSyncQueue,
  setOnlineStatus,
  reorderSyncQueue,
} = offlineSlice.actions;
export default offlineSlice.reducer;
