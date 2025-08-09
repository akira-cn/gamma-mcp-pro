/**
 * Logger utility for structured logging
 */

export interface Logger {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}

/**
 * Simple console-based logger implementation
 */
export class ConsoleLogger implements Logger {
  constructor(private readonly name: string) {}

  private log(level: string, message: string, meta?: unknown): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] [${this.name}] ${message}`;

    if (meta) {
      console.log(logMessage, meta);
    } else {
      console.log(logMessage);
    }
  }

  debug(message: string, meta?: unknown): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: unknown): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: unknown): void {
    this.log('error', message, meta);
  }
}

/**
 * Create a new logger instance
 * @param name - Logger name/context
 * @returns Logger instance
 */
export function createLogger(name: string): Logger {
  return new ConsoleLogger(name);
}
