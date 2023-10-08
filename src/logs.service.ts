import winston, { Logger } from 'winston';

/**
 * Main service to handle the logs in the TFS Platform.
 */
export class LogsService {

  private static readonly LOG_LEVEL__INFO: string = 'info';
  private static readonly LOG_LEVEL__WARNING: string = 'warn';
  private static readonly LOG_LEVEL__ERROR: string = 'error';

  /**
   * The Winston's logger
   */
  protected logger: winston.Logger;

  constructor(options: { console?: boolean, postgres?: boolean } = { console: true }) {
    // Load dependencies
    const Postgres = require('@pauleliet/winston-pg-native');

    // Gather transports
    const transports = [
      ...(options.console === true ? [
        new winston.transports.Console({level: LogsService.LOG_LEVEL__INFO}),
      ] : []),
      ...(options.postgres === true ? [
        new Postgres({level: LogsService.LOG_LEVEL__INFO, connectionString: `postgres://${process.env.LOGS_PG_USERNAME}:${process.env.LOGS_PG_PASSWORD}@${process.env.LOGS_PG_HOST}:${process.env.LOGS_PG_PORT}/${process.env.LOGS_PG_DATABASE}`}),
      ] : []),
    ];
    const exceptionHandlers = [
      ...(options.console === true ? [
        new winston.transports.Console({level: LogsService.LOG_LEVEL__ERROR}),
      ] : []),
      ...(options.postgres === true ? [
        new Postgres({level: LogsService.LOG_LEVEL__ERROR, connectionString: `postgres://${process.env.LOGS_PG_USERNAME}:${process.env.LOGS_PG_PASSWORD}@${process.env.LOGS_PG_HOST}:${process.env.LOGS_PG_PORT}/${process.env.LOGS_PG_DATABASE}`}),
      ] : []),
    ];
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((i: any) => `${i.timestamp}\t${i.level}\t${i.message}`),
      ),
      transports,
      exceptionHandlers
    })
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
    this.logger.log(level, JSON.stringify({
      message,
      data,
    }));
  }

}

export default new LogsService();
