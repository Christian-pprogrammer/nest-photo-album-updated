import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Photo } from '../../photos/entities/photo.entity';

@Schema({ timestamps: true })
@ObjectType()
export class Album {
  @Field(() => String, { description: 'album id' })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'album name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'album description' })
  description: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  @Field(() => User, { description: 'album owner' })
  user: User;

  @Field(() => Date, { description: 'creation date' })
  createdAt: MongooseSchema.Types.Date;

  @Field(() => Date, { description: 'last update date' })
  updatedAt: MongooseSchema.Types.Date;

  @Field(() => [Photo], { description: 'Photos' })
  photos: Photo[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
