import {describe, expect, beforeEach, it} from '@jest/globals';
import { LogsService } from './logs.service';

describe('AuthService', () => {
  let service: LogsService;

  beforeEach(async () => {
    service = new LogsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log to console with level "info"', async () => {
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    service.info("test");
    await new Promise((r) => setTimeout(r, 100));
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log to console with level "warn"', async () => {
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    service.warning("test");
    await new Promise((r) => setTimeout(r, 100));
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log to console with level "error"', async () => {
    const consoleSpy = jest.spyOn(console._stdout, 'write');
    service.error("test");
    await new Promise((r) => setTimeout(r, 100));
    expect(consoleSpy).toHaveBeenCalled();
  });
});

declare global {
  interface Console {
    _stdout: {
      write: (payload: any) => void,
    },
  }
}
