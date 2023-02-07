import { CreatePhotoInput } from './create-photo.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhotoInput extends PartialType(CreatePhotoInput) {
  @Field(() => String)
  id: string;
}
