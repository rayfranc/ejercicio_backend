import { NestFactory } from '@nestjs/core';
import { RestaurantappModule } from './restaurantapp.module';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantappModule);
  await app.listen(3001);
}
bootstrap();
