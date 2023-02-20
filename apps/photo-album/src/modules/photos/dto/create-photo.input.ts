import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePhotoInput {
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;

  @Field(() => [String], { description: 'photo tags' })
  tags: string[];

  @Field(() => String, { description: 'album id' })
  albumid: string;
}
