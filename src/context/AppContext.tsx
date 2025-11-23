import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EcoLog } from '../types';

interface AppContextType {
  logs: EcoLog[];
  addLog: (log: Omit<EcoLog, 'id' | 'date'>) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = '@eco_tracker_logs';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<EcoLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const storedLogs = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (error) {
      console.error('Failed to load logs', error);
    } finally {
      setLoading(false);
    }
  };

  const saveLogs = async (newLogs: EcoLog[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
    } catch (error) {
      console.error('Failed to save logs', error);
    }
  };

  const addLog = async (logData: Omit<EcoLog, 'id' | 'date'>) => {
    const newLog: EcoLog = {
      ...logData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    const newLogs = [newLog, ...logs];
    setLogs(newLogs);
    await saveLogs(newLogs);
  };

  const deleteLog = async (id: string) => {
    const newLogs = logs.filter(log => log.id !== id);
    setLogs(newLogs);
    await saveLogs(newLogs);
  };

  return (
    <AppContext.Provider value={{ logs, addLog, deleteLog, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
