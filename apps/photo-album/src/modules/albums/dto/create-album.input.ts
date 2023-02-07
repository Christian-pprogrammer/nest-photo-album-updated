import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateAlbumInput {
  user?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'album name' })
  name: string;

  @Field(() => String, { description: 'album description' })
  description: string;
}
