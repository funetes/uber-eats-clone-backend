import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';

@Resolver()
export class UsersResolver {
  // need service
  constructor(private readonly usersService: UsersService) {}

  @Query((is) => Boolean)
  hi() {
    return true;
  }
}
