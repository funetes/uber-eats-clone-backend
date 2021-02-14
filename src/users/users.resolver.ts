import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutPut,
} from './dtos/create-Account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  // need userService
  constructor(private readonly userService: UsersService) {}

  @Query((type) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() user: User) {
    return user;
  }

  @Mutation((type) => CreateAccountOutPut)
  async createAccount(
    @Args('input') createAccoutInput: CreateAccountInput,
  ): Promise<CreateAccountOutPut> {
    try {
      const result = await this.userService.createAccout(createAccoutInput);
      return result;
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation((type) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return await this.userService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
