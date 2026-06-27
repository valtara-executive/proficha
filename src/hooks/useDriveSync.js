import { useState, useCallback } from 'react';
import { driveService } from '../core/services/driveService';

export const useDriveSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [lastSyncDate, setLastSyncDate] = useState(null);

  const backupToCloud = useCallback(async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const result = await driveService.uploadDatabaseBackup();
      setLastSyncDate(new Date().toISOString());
      console.log('Respaldo exitoso en Drive:', result);
      return result;
    } catch (error) {
      console.error('Error durante la sincronización:', error);
      setSyncError(error.message || 'Ocurrió un error al intentar respaldar en la nube.');
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    isSyncing,
    syncError,
    lastSyncDate,
    backupToCloud
  };
};
