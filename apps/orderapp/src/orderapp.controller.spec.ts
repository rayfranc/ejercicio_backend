import { Test, TestingModule } from '@nestjs/testing';
import { OrderappController } from './orderapp.controller';
import { OrderappService } from './orderapp.service';

describe('OrderappController', () => {
  let orderappController: OrderappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderappController],
      providers: [OrderappService],
    }).compile();

    orderappController = app.get<OrderappController>(OrderappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderappController.getHello()).toBe('Hello World!');
    });
  });
});
