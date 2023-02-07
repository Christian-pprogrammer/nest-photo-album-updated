import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhotoInput {
  @Field(() => String, { description: 'photo url' })
  photourl: string;

  @Field(() => [String], { description: 'photo tags' })
  tags: string[];

  @Field(() => String, { description: 'album id' })
  albumid: string;
}
