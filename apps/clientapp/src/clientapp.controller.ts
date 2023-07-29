import { Controller,Inject,Req,Res,UsePipes} from '@nestjs/common';
import { ClientappService} from './clientapp.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateClientSuccessDto,ClientError} from './dto/create-client.dto';
import { GoToRestaurantReq, IdSchema, JoiValidationPipe, UpdateClientSchema, createClientSchema } from 'apps/clientapp/src/pipes/validation.pipes';

import { Client } from './schemas/client.scheme';
@Controller()
export class ClientappController {
  constructor( @Inject('RESTAURANT_SERVICE') private client:ClientProxy, private readonly clientsService: ClientappService) {}

  @EventPattern('get_clients')
  async getClient():Promise<Client[]>{
  const res=await this.clientsService.findAll()
  return res
}

@EventPattern('get_client_by_id')
@UsePipes(new JoiValidationPipe(IdSchema))
  async getClientById(data):Promise<Client|ClientError>{
    const {id:_id,error}=data
    if(error){
      return error
    }
  const res=await this.clientsService.findOne(_id)
  if(!res){
    return {
      error:"El Id no existe en la base de datos"
    }
  }
  return res
}

 @EventPattern('post_clients')
 @UsePipes(new JoiValidationPipe(createClientSchema))
async postClient( createClientDto:any):Promise<CreateClientSuccessDto|ClientError>{
 const {error}=createClientDto
  if(!error){
  const response=await this.clientsService.create(createClientDto)
  return {
    message:"Cliente creado",
    client:response
  }
  }else{
    return {error}
  }
}

@EventPattern('put_client')
 @UsePipes(new JoiValidationPipe(UpdateClientSchema))
async putClient(value):Promise<CreateClientSuccessDto|ClientError>{
 const{error}=value
  if(!error){
  const response=await this.clientsService.findAndUpdate(value.id.id,value.data)
  return {
    message:"Cliente Actualizado",
    client:response
  }
  }else{
    return {error}
  }
}

@EventPattern('delete_client')
@UsePipes(new JoiValidationPipe(IdSchema))
async deleteClient(data):Promise<CreateClientSuccessDto|ClientError>{
  const {id:_id,error}=data
  if(error){
    return error
  }
const res=await this.clientsService.findByIdAndDelete(_id)
if(!res){
  return {
    error:"El Id no existe en la base de datos"
  }
}
return {
  message:'Se elimino el cliente con exito',
  client:res
}
}

@EventPattern('go_to_restaurant')
@UsePipes(new JoiValidationPipe(GoToRestaurantReq))
async goToRestaurant(body:any){
  const {error,...rest}=body
  if(error){
    return error
  }
const res=await this.clientsService.findOne(rest.id.id)
if(!res){
  return {
    error:"El Id del cliente no existe en la base de datos"
  }
}else{
     const data={
      id:rest.idRes,
      client:res
     }
     this.client.send('add_client_by_id',data).subscribe({
      next: (v) =>{
        console.log(v)
      },
      error: (e) => console.log(e)
      ,
      complete: () => console.info('complete')
     })
  return {
    message:'Se agrego el cliente con exito',
    client:res
  }
}

}


}

