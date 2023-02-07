import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String, { description: 'user id' })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'user email' })
  email: string;

  @Prop()
  @Field(() => String, { description: 'user email' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
