import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './../src/controller/app.controller';
import { AppServiceImpl } from './../src/service/impl/app.service.impl';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppServiceImpl],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('should return status up', () => {
    it('should return "{status:"UP"}"', () => {
      const statusUpString = { status: 'UP' };
      expect(appController.getHealth()).toMatchObject(statusUpString);
    });
  });
});
