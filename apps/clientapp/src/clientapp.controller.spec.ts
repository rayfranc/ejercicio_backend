import { Test, TestingModule } from '@nestjs/testing';
import { ClientappController } from './clientapp.controller';
import { ClientappService } from './clientapp.service';

describe('ClientappController', () => {
  let clientappController: ClientappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientappController],
      providers: [ClientappService],
    }).compile();

    clientappController = app.get<ClientappController>(ClientappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clientappController.getHello()).toBe('Hello World!');
    });
  });
});
