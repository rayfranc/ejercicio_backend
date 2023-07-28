import { Module } from '@nestjs/common';
import { OrderappController } from './orderapp.controller';
import { OrderappService } from './orderapp.service';

@Module({
  imports: [],
  controllers: [OrderappController],
  providers: [OrderappService],
})
export class OrderappModule {}
