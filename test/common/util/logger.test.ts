import { Logger } from '../../../src/common/util/logger/logger';
describe('Logger Config', () => {
  it('should be defined', () => {
    expect(Logger).toBeDefined();
  });
  it('logLevels should be debug if undefined', () => {
    const loglevels: any = undefined;
    const logger = new Logger(loglevels);
    expect(logger.logLevels).toStrictEqual(['debug']);
  });
  it('logLeves should be assigned correctly', () => {
    const loglevels: any = 'DEBUG,INFO,WARN,ERROR';
    const logger = new Logger(loglevels);
    expect(logger.logLevels).toStrictEqual(['debug', 'info', 'warn', 'error']);
  });
});
