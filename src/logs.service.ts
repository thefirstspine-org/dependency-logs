import winston, { Logger } from 'winston';
import { LogglyWinston } from './loggly-winston';
import { BetterStackWinston } from './better-stack-winston';

/**
 * Main service to handle the logs in the TFS Platform.
 */
export class LogsService {

  private static readonly LOG_LEVEL__DEBUG: string = 'debug';
  private static readonly LOG_LEVEL__INFO: string = 'info';
  private static readonly LOG_LEVEL__WARNING: string = 'warn';
  private static readonly LOG_LEVEL__ERROR: string = 'error';

  /**
   * The Winston's logger
   */
  protected logger: winston.Logger;

  constructor() {
    // Gather transports
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((i: any) => JSON.stringify({
          ...i,
          timestamp: i.timestamp,
          level: i.level,
          message: i.message,
          service: process.env.SERVICE ? process.env.SERVICE : 'unknown',
          env: process.env.ENV ? process.env.ENV : 'unknown',
          data: i.data,
        }))
      ),
      transports: new winston.transports.Console(),
      exceptionHandlers: new winston.transports.Console(),
    })
  }

  /**
   * Log a debug message. An information is has only a purpose for debugging.
   * @param message The message to log.
   * @param data The data about the log (context for instance).
   */
  debug(message: string, data?: any): void {
    this.log(LogsService.LOG_LEVEL__DEBUG, message, data);
  }

  /**
   * Log an information message. An information is has only a purpose for debugging.
   * @param message The message to log.
   * @param data The data about the log (context for instance).
   */
  info(message: string, data?: any): void {
    this.log(LogsService.LOG_LEVEL__INFO, message, data);
  }

  /**
   * Log a warning. A warning is an unexpected behavior that occurs in the platform, but handled properly.
   * @param message The message to log.
   * @param data The data about the log (context for instance).
   */
  warning(message: string, data?: any): void {
    this.log(LogsService.LOG_LEVEL__WARNING, message, data);
  }

  /**
   * Log an error. An error should be treated immediatly because this is an unexpected and not handled behavior.
   * @param message The message to log.
   * @param data The data about the log (context for instance).
   */
  error(message: string, data?: any): void {
    this.log(LogsService.LOG_LEVEL__ERROR, message, data);
  }

  /**
   * Get Winston logger
   * @returns The winston logger
   */
  getLogger(): Logger {
    return this.logger;
  }

  /**
   * Log a message with optional data.
   * @param level
   * @param message
   * @param data
   */
  protected log(level: string, message: string, data?: any): void {
    this.logger.log(level, {
      message,
      data,
    });
  }

}

export default new LogsService();
