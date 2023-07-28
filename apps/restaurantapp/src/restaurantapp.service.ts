import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RestaurantDto } from './dto/restaurant.dto';
import { Injectable } from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.scheme';

@Injectable()
export class RestaurantappService{
    constructor(@InjectModel(Restaurant.name) private RestaurantModel: Model<Restaurant>) {}
   
   
    async findAll(): Promise<Restaurant[]> {
        return this.RestaurantModel.find().exec();
      }
    
   async create(RestaurantDto: RestaurantDto): Promise<Restaurant>{
    const createdRestaurant= new this.RestaurantModel(RestaurantDto)
    return createdRestaurant.save();
   
   }
}