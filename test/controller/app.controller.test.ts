import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/controller/app.controller';
import { AppServiceImpl } from '../../src/service/impl/app.service.impl';

describe('AppController test', () => {
  let appController: AppController;
  let spyService: AppServiceImpl;
  const mockMethods = {
    getHealth: jest.fn(),
  };
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppServiceImpl,
          useFactory: () => mockMethods,
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
    spyService = app.get<AppServiceImpl>(AppServiceImpl);
  });

  it('should call getHealth from service', async () => {
    appController.getHealth();
    expect(spyService.getHealth).toHaveBeenCalled();
  });
});
