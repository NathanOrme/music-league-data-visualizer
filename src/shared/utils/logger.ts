/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/*
 * Centralized logger with global console shim support.
 * - In development and test: pass through to native console and buffer logs.
 * - In production: buffer all logs; warn/error still go to native console, while log/info/debug are suppressed from console but retained in buffer.
 */

declare const jest: unknown;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: unknown[]; // preserve original args
  timestamp: string; // ISO
}

interface AppLogger {
  buffer: LogEntry[];
  maxBuffer: number;
  push: (level: LogLevel, ...args: unknown[]) => void;
  flush: () => LogEntry[];
  download: () => void;
}

// Environment detection that works in Jest, Node.js, and Vite
const isTestEnv =
  typeof jest !== 'undefined' ||
  (typeof process !== 'undefined' && process.env.NODE_ENV === 'test');

// Check for development environment - works in both Vite and Node.js
const isDevEnv =
  !isTestEnv &&
  ((typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development') ||
    (typeof window !== 'undefined' &&
      window.location.hostname === 'localhost'));

// Export for testing purposes
export const __test__ = {
  isTestEnv,
  isDevEnv,
};

const createLogger = (): AppLogger => {
  const buffer: LogEntry[] = [];
  const maxBuffer = 1000;

  const push = (level: LogLevel, ...args: unknown[]) => {
    // Trim buffer to maintain size
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

// Expose for debugging/support

(globalThis as any).__APP_LOGGER__ = appLogger;

// Installs console shim. Safe to call multiple times.
export function installConsoleShim(): void {
  if (
    typeof globalThis === 'undefined' ||
    !(globalThis as any).console
  ) {
    return;
  }
  const g = globalThis as Record<string, unknown>;
  const nativeConsole = (g.__NATIVE_CONSOLE__ ||
    g.console) as Console;

  // Avoid double-wrapping
  if (!g.__NATIVE_CONSOLE__) {
    g.__NATIVE_CONSOLE__ = { ...nativeConsole } as Console;
  }

  const passthrough =
    (method: keyof Console, level: LogLevel, toConsole: boolean) =>
    (...args: unknown[]) => {
      try {
        appLogger.push(level, ...args);
      } catch {
        // ignore buffer failures
      }
      if (
        toConsole &&
        typeof (nativeConsole as any)?.[method] === 'function'
      ) {
        // Use native console to preserve stack/source maps where possible
        try {
          (nativeConsole as any)[method](...args);
        } catch {
          // no-op
        }
      }
    };

  // In dev/test, always print to console; in prod, only warn/error print to console.
  const devOrTest = isDevEnv || isTestEnv;

  g.console = {
    ...nativeConsole,
    debug: passthrough('debug', 'debug', devOrTest),
    log: passthrough('log', 'info', devOrTest),
    info: passthrough('info', 'info', devOrTest),
    warn: passthrough('warn', 'warn', true /* always show */),
    error: passthrough('error', 'error', true /* always show */),
  } as Console;
}

// Optional helper API for direct usage
export const logger = {
  debug: (...args: unknown[]) =>
    (globalThis as any).console.debug(...args),
  info: (...args: unknown[]) =>
    (globalThis as any).console.info(...args),
  warn: (...args: unknown[]) =>
    (globalThis as any).console.warn(...args),
  error: (...args: unknown[]) =>
    (globalThis as any).console.error(...args),
  flush: () => appLogger.flush(),
  download: () => appLogger.download(),
};
