import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurntDto } from './create-restaurnt.dto';

@InputType()
export class UpdateRestaurntInputType extends PartialType(CreateRestaurntDto) {}

@ArgsType()
export class UpdateRestaurntDto {
  @Field()
  id: number;

  @Field()
  data: UpdateRestaurntInputType;
}
