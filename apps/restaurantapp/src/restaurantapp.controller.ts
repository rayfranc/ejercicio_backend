import { Controller, Get } from '@nestjs/common';
import { RestaurantappService } from './restaurantapp.service';

@Controller()
export class RestaurantappController {
  constructor(private readonly restaurantappService: RestaurantappService) {}

  @Get()
  getHello(): string {
    return 'this.restaurantappService.getHello();'
  }
}
