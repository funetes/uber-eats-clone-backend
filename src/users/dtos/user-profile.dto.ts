import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/common.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends MutationOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
