import { CreateAlbumInput } from './create-album.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAlbumInput extends PartialType(CreateAlbumInput) {
  @Field(() => String)
  id: string;
}
