import { NestFactory } from '@nestjs/core';
import { RestaurantappModule } from './restaurantapp.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RestaurantappModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  await app.listen()
}
bootstrap();
