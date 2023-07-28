import { NestFactory } from '@nestjs/core';
import { OrderappModule } from './orderapp.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderappModule);
  await app.listen(3000);
}
bootstrap();
