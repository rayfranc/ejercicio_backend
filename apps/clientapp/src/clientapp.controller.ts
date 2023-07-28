import { Body, Controller, Res, UsePipes} from '@nestjs/common';
import { ClientappService} from './clientapp.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateClientDto, CreateClientSuccessDto,CreateClientError} from './dto/create-client.dto';
import { JoiValidationPipe, createClientSchema } from 'apps/examen/src/pipes/validation.pipes';
import { error } from 'console';




@Controller()
export class ClientappController {
  constructor(private readonly clientsService: ClientappService) {}

  @EventPattern('get_clients')
  async getClient():Promise<string>{
  const res=await this.clientsService.findAll()
  return res.toString()
}
 @EventPattern('post_clients')
 @UsePipes(new JoiValidationPipe(createClientSchema))
async postClient( createClientDto:any) :Promise<CreateClientSuccessDto|CreateClientError>{
 const {error, value}=createClientDto
  if(!error){
  const response=await this.clientsService.create(value)
  return {
    message:"Cliente creado",
    client:response
  }
  }else{
    return {error}
  }
}


}
