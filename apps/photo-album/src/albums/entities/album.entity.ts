import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Album {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
