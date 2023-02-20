import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoggedUserOutput } from '../users/dto/logged-user.output';
import { LoginUserInput } from '../users/dto/login-user.input';
import { AuthService } from './auth.service';
import { Public } from '../../decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => LoggedUserOutput)
  @Public()
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
