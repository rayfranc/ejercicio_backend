import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto} from './dto/restaurant.dto';
import { Injectable } from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.scheme';

@Injectable()
export class RestaurantappService{
    constructor(@InjectModel(Restaurant.name) private RestaurantModel: Model<Restaurant>) {}
   
   
    async findAll(): Promise<Restaurant[]> {
        return this.RestaurantModel.find().exec();
      }
    
   async create(RestaurantDto: CreateRestaurantDto): Promise<Restaurant>{
    const createdRestaurant= new this.RestaurantModel(RestaurantDto)
    return createdRestaurant.save();
   
   }
   async findOne(id:string): Promise<Restaurant> {
    return this.RestaurantModel.findById(id).exec();
  }

  async findAndUpdate(id:string,data:CreateRestaurantDto){
    const updateRestaurant=this.RestaurantModel.findByIdAndUpdate(id,data)
    return updateRestaurant
  }

  async findByIdAndDelete(id:string):Promise<Restaurant>{
    return this.RestaurantModel.findByIdAndDelete(id).exec()
    
  }
}