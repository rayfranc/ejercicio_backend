import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ClientDto } from '../dto/clients.dto';
import { Client } from './client.scheme';

export type ClientDocument = HydratedDocument<Restaurant>

@Schema()
export class Restaurant{
        constructor(name:string,address:string,clients:Client[],capacity:number){
      this.name=name;
      this.capacity=capacity
      this.address=address
      this.clients=clients
      
        }
    @Prop()
    name:string
    @Prop()
    address:string
    @Prop()
    capacity:number
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }] })
    clients:Client[]
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);