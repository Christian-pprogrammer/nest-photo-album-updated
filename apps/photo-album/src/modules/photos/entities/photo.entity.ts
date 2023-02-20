import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Album } from '../../albums/entities/album.entity';

@Schema({ timestamps: true })
@ObjectType()
export class Photo {
  @Field(() => String, { description: 'photo id' })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'photo url' })
  photourl: string;

  @Prop()
  @Field(() => [String], { description: 'photo tags' })
  tags: string[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Album',
    autopopulate: true,
  })
  @Field(() => Album, { description: 'album' })
  albumid: Album;

  @Field(() => String, { description: 'get full base 64 encoded image' })
  base64_encoded?: string;

  @Field(() => Date, { description: 'creation date' })
  createdAt: MongooseSchema.Types.Date;

  @Field(() => Date, { description: 'last update date' })
  updatedAt: MongooseSchema.Types.Date;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
