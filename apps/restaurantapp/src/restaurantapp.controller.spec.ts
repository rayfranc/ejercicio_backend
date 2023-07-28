import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantappController } from './restaurantapp.controller';
import { RestaurantappService } from './restaurantapp.service';

describe('RestaurantappController', () => {
  let restaurantappController: RestaurantappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantappController],
      providers: [RestaurantappService],
    }).compile();

    restaurantappController = app.get<RestaurantappController>(RestaurantappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(restaurantappController.getHello()).toBe('Hello World!');
    });
  });
});
