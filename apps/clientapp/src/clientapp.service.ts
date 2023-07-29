import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Injectable } from '@nestjs/common';
import { Client } from './schemas/client.scheme';

@Injectable()
export class ClientappService{
    constructor(@InjectModel(Client.name) private ClientModel: Model<Client>) {}
   
   
    async findAll(): Promise<Client[]> {
        return this.ClientModel.find().exec();
      }
    
   async create(createClientDto: CreateClientDto): Promise<Client>{
    const createdClient= new this.ClientModel(createClientDto)
    return createdClient.save();
   
   }

   async findOne(id:string): Promise<Client> {
    return this.ClientModel.findById(id).exec();
  }

  async findAndUpdate(id:string,data:CreateClientDto){
    const updateClient=this.ClientModel.findByIdAndUpdate(id,data)
    return updateClient
  }

  async findByIdAndDelete(id:string):Promise<Client>{
    return this.ClientModel.findByIdAndDelete(id).exec()
    
  }
}
