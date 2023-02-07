import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user email' })
  password: string;
}
