import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import mongoose from 'mongoose';
import * as Joi from 'joi'
import { ObjectSchema } from 'joi';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
     const data={
      error,
      value
     }
     return data
    }
    return value;
  }
}

export const ClientSchema=Joi.object({
  name:Joi.string().required(),
  age:Joi.number().required(),
  email:Joi.string().email().required(),
  phone:Joi.string().required()
})

 export const createRestaurantSchema=Joi.object({
  name:Joi.string().required(),
  address:Joi.string().required(),
  capacity:Joi.number().required(),
  clients:Joi.array().ordered(ClientSchema).default([])
})

export const IdSchema=Joi.object({
  id:Joi.string().custom((value, helpers) => {
    const filtered = mongoose.Types.ObjectId.isValid(value)
    return !filtered ? helpers.error("No es un MongoID") : value;
})
})

export const UpdateRestaurantSchema=Joi.object({
  id:IdSchema,
  data:Joi.object({
    name:Joi.string(),
    address:Joi.string(),
    capacity:Joi.number(),
    clients:Joi.array().ordered(ClientSchema)
  })
})
