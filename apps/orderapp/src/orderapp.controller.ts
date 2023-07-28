import { Controller, Get } from '@nestjs/common';
import { OrderappService } from './orderapp.service';

@Controller()
export class OrderappController {
  constructor(private readonly orderappService: OrderappService) {}

  @Get()
  getHello(): string {
    return this.orderappService.getHello();
  }
}
