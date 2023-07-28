import { Module } from '@nestjs/common';
import { RestaurantappController } from './restaurantapp.controller';
import { RestaurantappService } from './restaurantapp.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './schemas/restaurant.scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])
  
  ],
  controllers: [RestaurantappController],
  providers: [RestaurantappService],
})
export class RestaurantappModule {}
