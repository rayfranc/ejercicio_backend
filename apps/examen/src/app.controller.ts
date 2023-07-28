import { Controller, Get,Post,Body ,Inject, Res, BadRequestException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable} from 'rxjs';
import { CreateClientDto} from './dto/client.dto';

@Controller('/client')
export class AppController {
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
}
