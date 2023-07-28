import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
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

 export const createClientSchema=Joi.object({
  name:Joi.string().required(),
  age:Joi.number().required(),
  email:Joi.string().email().required(),
  phone:Joi.string().required()
})

export const IdSchema=Joi.object({
  id:Joi.string().custom((value, helpers) => {
    const filtered = mongoose.Types.ObjectId.isValid(value)
    return !filtered ? helpers.error("No es un MongoID") : value;
})
})
