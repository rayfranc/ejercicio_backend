import { Controller, Get,Post,Body ,Inject, Res, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { CreateClientDto} from './dto/client.dto';

@Controller()
export class AppController {
  constructor( @Inject('CLIENT_SERVICE') private client: ClientProxy) {}

  @Get()
  getHello(): Observable<any> {
    return  this.client.send('get_clients','');
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
