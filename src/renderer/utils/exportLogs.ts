import { EVENT_KEYS } from '../../types/events';
import { ServerLog } from '../../types';
import { isElectronEnabled } from '../const/general';

export function exportLogsToFile(logs: ServerLog[]): void {
  const payload = {
    exportedAt: new Date().toISOString(),
    logs,
  };
  const content = JSON.stringify(payload, null, 2);

  if (isElectronEnabled && window.electron?.ipcRenderer) {
    window.electron.ipcRenderer.sendMessage(EVENT_KEYS.EXPORT_CONSOLE_LOGS, {
      content,
    });
    window.electron.ipcRenderer.once(
      EVENT_KEYS.EXPORT_CONSOLE_LOGS,
      (_arg: { success?: boolean; canceled?: boolean; error?: string }) => {}
    );
    return;
  }

  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'console-export.json';
  a.click();
  URL.revokeObjectURL(url);
}
