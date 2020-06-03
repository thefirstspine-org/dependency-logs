import winston from 'winston';

/**
 * Main service to handle the logs in the TFS Platform.
 */
export class LogsService {

  private static readonly LOG_LEVEL__INFO: string = 'info';
  private static readonly LOG_LEVEL__WARNING: string = 'warn';
  private static readonly LOG_LEVEL__ERROR: string = 'error';

  /**
   * Default value of the logs file prefix
   */
  static readonly DEFAULT_LOGS_FILE_PREFIX: string = 'app';

  /**
   * The Winston's logger
   */
  protected logger: winston.Logger;

  constructor() {
    // Gather log prefix
    const logPrefix = process.env?.LOGS_FILE_PREFIX?.length > 0 ? process.env.LOGS_FILE_PREFIX : LogsService.DEFAULT_LOGS_FILE_PREFIX;

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((i: any) => `${i.timestamp}\t${i.level}\t${i.message}`),
      ),
      transports: [
        new winston.transports.File({ filename: `/var/log/${logPrefix}-error.log`, level: 'error' }),
        new winston.transports.File({ filename:  `/var/log/${logPrefix}-warning.log`, level: 'warning' }),
        new winston.transports.File({ filename:  `/var/log/${logPrefix}-info.log`, level: 'info' }),
        new winston.transports.File({ filename:  `/var/log/${logPrefix}-combined.log` }),
        new winston.transports.Console(),
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename:  `/var/log/${logPrefix}-exceptions.log` }),
      ],
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
