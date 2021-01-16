import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurnt } from './entities/restaurnt.entity';
import { RestaurntResolver } from './restaurnts.resolver';
import { RestaurntService } from './restaurnts.service';

@Module({
  providers: [RestaurntResolver, RestaurntService],
  imports: [TypeOrmModule.forFeature([Restaurnt])],
})
export class RestaurntsModule {}
