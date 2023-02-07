import { CreatePhotoInput } from './create-photo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhotoInput extends PartialType(CreatePhotoInput) {
  @Field(() => Int)
  id: number;
}
