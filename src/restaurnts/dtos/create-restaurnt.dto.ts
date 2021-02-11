import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurnt } from '../entities/restaurnt.entity';

@InputType()
export class CreateRestaurntDto extends OmitType(
  Restaurnt,
  ['id'] as const,
  InputType,
) {}
