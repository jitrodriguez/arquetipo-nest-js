import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
@Injectable()
export class Logger extends ConsoleLogger {
  public logLevels: LogLevel[];

  constructor(private logLevelsString: string) {
    super();
    if (!this.logLevelsString) {
      this.logLevels = ['debug'] as LogLevel[];
      this.warn('LOG_LEVELS not found, default value: DEBUG', 'Logger');
      this.logLevelsString = 'DEBUG';
    } else {
      this.logLevels = this.logLevelsString
        .split(',')
        .map((l) => l.toLowerCase()) as LogLevel[];
    }
    this.log(`Log levels: ${this.logLevelsString}`, 'Logger');

    this.setLogLevels(this.logLevels);
  }
}
