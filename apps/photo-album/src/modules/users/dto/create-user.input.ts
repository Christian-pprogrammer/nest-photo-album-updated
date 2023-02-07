import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user username' })
  username: string;

  @Field(() => String, { description: 'user password' })
  password: string;
}
