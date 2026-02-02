/**
 * Centralized logger with buffer support
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: unknown[];
  timestamp: string;
}

interface AppLogger {
  buffer: LogEntry[];
  maxBuffer: number;
  push: (level: LogLevel, ...args: unknown[]) => void;
  flush: () => LogEntry[];
  download: () => void;
}

const createLogger = (): AppLogger => {
  const buffer: LogEntry[] = [];
  const maxBuffer = 1000;

  const push = (level: LogLevel, ...args: unknown[]) => {
    if (buffer.length >= maxBuffer) {
      buffer.shift();
    }
    buffer.push({
      level,
      message: args,
      timestamp: new Date().toISOString(),
    });
  };

  const flush = () => buffer.slice();

  const download = () => {
    const blob = new Blob([JSON.stringify(buffer, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { buffer, maxBuffer, push, flush, download };
};

export const appLogger: AppLogger = createLogger();

export const logger = {
  debug: (...args: unknown[]) => {
    appLogger.push('debug', ...args);
    console.debug(...args);
  },
  info: (...args: unknown[]) => {
    appLogger.push('info', ...args);
    console.info(...args);
  },
  warn: (...args: unknown[]) => {
    appLogger.push('warn', ...args);
    console.warn(...args);
  },
  error: (...args: unknown[]) => {
    appLogger.push('error', ...args);
    console.error(...args);
  },
  flush: () => appLogger.flush(),
  download: () => appLogger.download(),
};
