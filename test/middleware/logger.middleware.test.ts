import { LoggerMiddleware } from '../../src/middleware/logger.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware()).toBeDefined();
  });

  it('should call next', () => {
    const loggerMiddleware = new LoggerMiddleware();
    const next = jest.fn();
    const req: any = {
      get: jest.fn((name) => {
        if (name === 'user-agent') return 'test';
      }),
    };
    const res: any = {
      send: jest.fn(),
      on: jest.fn(),
    };
    loggerMiddleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
