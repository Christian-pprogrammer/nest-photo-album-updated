import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhotoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
