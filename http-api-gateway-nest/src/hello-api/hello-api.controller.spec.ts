import { Test, TestingModule } from '@nestjs/testing';
import { HelloApiController } from './hello-api.controller';

describe('AppController', () => {
  let appController: HelloApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloApiController],
      providers: [],
    }).compile();

    appController = app.get<HelloApiController>(HelloApiController);
  });

  describe('root', () => {
    it('should return "Hello NATS!"', () => {
      expect(appController.helloNATS()).toBe('Hello NATS!');
    });
  });
});
