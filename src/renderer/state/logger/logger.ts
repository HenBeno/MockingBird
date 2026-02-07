import { create } from 'zustand';
import throttle from 'lodash.throttle';
import { ServerLog } from '../../../types';

export type LoggerStateFuncs = {
  resetLoggerState: () => void;
  addServerLog: (log: ServerLog) => void;
  toggleLogSelection: (id: string) => void;
  selectAllLogs: (ids: string[]) => void;
  clearLogSelection: () => void;
};

export type LoggerStateProps = {
  serverLogs: ServerLog[];
  selectedLogIds: string[];
};

export type SettingsState = LoggerStateFuncs & LoggerStateProps;

const INIT_STATE: LoggerStateProps = {
  serverLogs: [],
  selectedLogIds: [],
};

export const useLoggerStore = create<SettingsState>((set) => {
  let logBuffer: ServerLog[] = [];

  const flushLogs = () => {
    if (logBuffer.length > 0) {
      set((state) => ({ serverLogs: [...state.serverLogs, ...logBuffer] }));
      logBuffer = [];
    }
  };

  // Throttle the flushing to ensure it happens at a regular interval
  const throttledFlushLogs = throttle(flushLogs, 1000); // Flush every 1000ms

  return {
    ...INIT_STATE,
    resetLoggerState: () => set({ ...INIT_STATE }),
    addServerLog: (newLog) => {
      logBuffer.push(newLog);
      throttledFlushLogs(); // Ensure logs are flushed at regular intervals
    },
    toggleLogSelection: (id) =>
      set((state) => {
        const has = state.selectedLogIds.includes(id);
        return {
          selectedLogIds: has
            ? state.selectedLogIds.filter((x) => x !== id)
            : [...state.selectedLogIds, id],
        };
      }),
    selectAllLogs: (ids) => set({ selectedLogIds: ids }),
    clearLogSelection: () => set({ selectedLogIds: [] }),
  };
});
