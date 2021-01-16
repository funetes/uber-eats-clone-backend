import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { createRestaurntDto } from './dtos/create-restaurnt.dto';
import { Restaurnt } from './entities/restaurnt.entity';
import { RestaurntService } from './restaurnts.service';

@Resolver()
export class RestaurntResolver {
  constructor(private readonly restaurntService: RestaurntService) {}

  @Query((is) => [Restaurnt])
  restaurnts(@Args('veganOnly') veganOnly: boolean): Promise<Restaurnt[]> {
    console.log(veganOnly);
    return this.restaurntService.getAll();
  }
  @Mutation((is) => Boolean)
  createRestaurnt(@Args() createRestaurntDto: createRestaurntDto): boolean {
    console.log(createRestaurntDto);
    return true;
  }
}
