import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientController, RestaurantController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        }
      },{
      name:'RESTAURANT_SERVICE',
      transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        }
    }]),
    ConfigModule.forRoot({
    isGlobal: true,
  }),
],
  controllers: [ClientController,RestaurantController],
  providers: [AppService],
})
export class AppModule {}
