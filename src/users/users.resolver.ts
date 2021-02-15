import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-Account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verifyEmail.dto';
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

  @Query((type) => UserProfileOutput)
  @UseGuards(AuthGuard)
  async userProfile(
    @Args() userProFileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return await this.userService.findById(userProFileInput.id);
  }

  @Mutation((type) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccoutInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return await this.userService.createAccout(createAccoutInput);
  }

  @Mutation((type) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return await this.userService.login(loginInput);
  }

  @Mutation((type) => EditProfileOutput)
  @UseGuards(AuthGuard)
  async editProfile(
    @AuthUser() user: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return await this.userService.editProfile(user.id, editProfileInput);
  }

  @Mutation((type) => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return await this.userService.verifyEmail(code);
  }
}
