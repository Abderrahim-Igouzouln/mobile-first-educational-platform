export type ConflictStrategy = 'last-write-wins' | 'server-wins' | 'merge';

export interface SyncRecord {
  entityId: string;
  entityType: 'progress' | 'answer' | 'bookmark';
  data: Record<string, unknown>;
  clientTs: number;
  deviceId: string;
}

export class ConflictResolver {
  resolve(
    serverRecord: SyncRecord | null,
    clientRecord: SyncRecord,
    strategy: ConflictStrategy = 'last-write-wins',
  ): SyncRecord {
    if (!serverRecord) return clientRecord;

    switch (strategy) {
      case 'last-write-wins':
        return serverRecord.clientTs >= clientRecord.clientTs
          ? serverRecord
          : clientRecord;

      case 'server-wins':
        return serverRecord;

      case 'merge':
        if (clientRecord.entityType === 'progress') {
          return this.mergeProgressRecords(serverRecord, clientRecord);
        }
        return serverRecord;

      default:
        return serverRecord;
    }
  }

  private mergeProgressRecords(server: SyncRecord, client: SyncRecord): SyncRecord {
    const progressOrder = ['not_started', 'in_progress', 'completed'];
    const serverStatus = (server.data['status'] as string) ?? 'not_started';
    const clientStatus = (client.data['status'] as string) ?? 'not_started';
    const serverIdx = progressOrder.indexOf(serverStatus);
    const clientIdx = progressOrder.indexOf(clientStatus);

    if (clientIdx > serverIdx) return client;
    return server;
  }
}
