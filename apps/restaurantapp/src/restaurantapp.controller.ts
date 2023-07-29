import { Controller, UsePipes } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RestaurantappService } from './restaurantapp.service';
import { Restaurant } from './schemas/restaurant.scheme';
import { IdSchema, JoiValidationPipe, UpdateRestaurantSchema, createRestaurantSchema } from './pipes/validation.pipes';
import { CreateRestaurantSuccessDto, RestaurantError } from './dto/restaurant.dto';

@Controller()
export class RestaurantappController {
  constructor(private readonly restaurantappService: RestaurantappService) {}

  @EventPattern('get_restaurants')
  async getRestaurants():Promise<Restaurant[]>{
  const res=await this.restaurantappService.findAll()
  return res
}

@EventPattern('get_restaurant_by_id')
@UsePipes(new JoiValidationPipe(IdSchema))
  async getClientById(data):Promise<Restaurant|RestaurantError>{
    const {id:_id,error}=data
    if(error){
      return error
    }
  const res=await this.restaurantappService.findOne(_id)
  if(!res){
    return {
      error:"El Id no existe en la base de datos"
    }
  }
  return res
}

@EventPattern('post_restaurants')
 @UsePipes(new JoiValidationPipe(createRestaurantSchema))
async postClient( data:any):Promise<CreateRestaurantSuccessDto|RestaurantError>{
 const {error}=data
  if(!error){
  const response=await this.restaurantappService.create(data)
  return {
    message:"Restaurante creado",
    restaurant:response
  }
  }else{
    return {error}
  }
}


@EventPattern('put_restaurant')
 @UsePipes(new JoiValidationPipe(UpdateRestaurantSchema))
async putClient(value):Promise<CreateRestaurantSuccessDto|RestaurantError>{
 const{error}=value
  if(!error){
  const response=await this.restaurantappService.findAndUpdate(value.id.id,value.data)
  return {
    message:"Restaurante Actualizado",
    restaurant:response
  }
  }else{
    return {error}
  }
}

@EventPattern('delete_restaurant')
@UsePipes(new JoiValidationPipe(IdSchema))
async deleteClient(data):Promise<CreateRestaurantSuccessDto|RestaurantError>{
  const {id:_id,error}=data
  if(error){
    return error
  }
const res=await this.restaurantappService.findByIdAndDelete(_id)
if(!res){
  return {
    error:"El Id no existe en la base de datos"
  }
}
return {
  message:'Se elimino el restaurante con exito',
  restaurant:res
}
}
@EventPattern('add_client_by_id')
async addClientById(data):Promise<CreateRestaurantSuccessDto|RestaurantError>{
  console.log(data)
  const restaurant= await this.restaurantappService.findOne(data.id.id)
  if(!restaurant){
    return {
      error:"El Id no existe en la base de datos"
    }
  }
  restaurant.clients.push(data.client)
  const res= await this.restaurantappService.findAndUpdate(data.id.id,restaurant)
  if(!res){
    return {
      error:"El Id no existe en la base de datos"
    }
  }
  return {
    message:'Se agrego el cliente con exito',
    restaurant:res
  }
}
}
