import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { log } from 'console';
import { CreateRestaurntDto } from './dtos/create-restaurnt.dto';
import { UpdateRestaurntDto } from './dtos/update-restaurnt.dto';
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
  async createRestaurnt(
    @Args('input') createRestaurntDto: CreateRestaurntDto,
  ): Promise<boolean> {
    try {
      this.restaurntService.createRestaurnt(createRestaurntDto);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  @Mutation((is) => Boolean)
  async updateRestaurnt(
    @Args() updateRestaurntDto: UpdateRestaurntDto,
  ): Promise<boolean> {
    try {
      await this.restaurntService.updateRestaurnt(updateRestaurntDto);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
