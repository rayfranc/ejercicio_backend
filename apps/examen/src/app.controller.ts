import { Controller, Get,Post,Body ,Inject, Res, BadRequestException, Param, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable} from 'rxjs';
import { CreateClientDto, IdDto} from './dto/client.dto';

@Controller('/client')
export class ClientController {
  constructor( @Inject('CLIENT_SERVICE') private client: ClientProxy) {}

  @Get()
  getClients(): Observable<any> {
    return  this.client.send('get_clients','');
  }

  @Get(':id')
  getClientByid(@Param() id:string): Observable<any> {
    return  this.client.send('get_client_by_id',id);
  }
  
  @Post()
 async postClient(@Body() createClientDto:CreateClientDto,@Res() res:any){
  this.client.send('post_clients', createClientDto).subscribe({
  next: (v) =>{
    res.send(v)
  },
  error: (e) => res.status(400).send(
    {
      error:"Error al crear el cliente",
      e
    }
  ),
  complete: () => console.info('complete') 
})
  }

  @Put(':id')
  async putClient(@Param() id:string,@Body() data:CreateClientDto,@Res() res:any){
    this.client.send('put_client', {id,data}).subscribe({
      next: (v) =>{
        res.send(v)
      },
      error: (e) => res.status(400).send(
        {
          error:"Error al crear el cliente",
          e
        }
      ),
      complete: () => console.info('complete') 
    })
  }

  @Delete(':id')
  deleteClient(@Param() id:string): Observable<any> {
    return  this.client.send('delete_client',id);
  }
  @Post('/gotorestaurant/:id')
  goToRestaurant(@Param() id:string,@Body() idRes:IdDto){
    const data={
      id,
      idRes
    }
    return this.client.send('go_to_restaurant',data)
  }
}

@Controller('/restaurant')
export class RestaurantController{
  constructor( @Inject('RESTAURANT_SERVICE') private restaurant: ClientProxy){}

  @Get()
  getRestaurants(): Observable<any> {
    return  this.restaurant.send('get_restaurants','');
  }

  @Get(':id')
  getClientByid(@Param() id:string): Observable<any> {
    return  this.restaurant.send('get_restaurant_by_id',id);
  }

  @Post()
 async postRestaurant(@Body() data,@Res() res:any){
  this.restaurant.send('post_restaurants', data).subscribe({
  next: (v) =>{
    res.send(v)
  },
  error: (e) => res.status(400).send(
    {
      error:"Error al crear el restaurante",
      e
    }
  ),
  complete: () => console.info('complete') 
})
  }

  @Put(':id')
  async putRestaurant(@Param() id:string,@Body() data:any,@Res() res:any){
    this.restaurant.send('put_restaurant', {id,data}).subscribe({
      next: (v) =>{
        res.send(v)
      },
      error: (e) => res.status(400).send(
        {
          error:"Error al crear el restaurante",
          e
        }
      ),
      complete: () => console.info('complete') 
    })
  }

  @Delete(':id')
  deleteClient(@Param() id:string): Observable<any> {
    return  this.restaurant.send('delete_restaurant',id);
  } 
}