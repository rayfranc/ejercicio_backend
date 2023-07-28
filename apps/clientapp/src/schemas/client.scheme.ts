import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>

@Schema()
export class Client{
  constructor(name:string,email:string,phone:string,age:number){
this.name=name;
this.age=age
this.email=email
this.phone=phone

  }
    @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;
  
  @Prop()
  phone: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);