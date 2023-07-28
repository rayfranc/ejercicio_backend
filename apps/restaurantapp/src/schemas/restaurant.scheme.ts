import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ClientDto } from '../dto/clients.dto';

export type ClientDocument = HydratedDocument<Restaurant>

@Schema()
export class Restaurant{
    @Prop()
    name:string
    @Prop()
    address:string
    @Prop()
    capacity:number
    @Prop([])
    clients:ClientDto[]
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);