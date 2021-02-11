import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';
import { CreateRestaurntDto } from './dtos/create-restaurnt.dto';
import { UpdateRestaurntDto } from './dtos/update-restaurnt.dto';
import { Restaurnt } from './entities/restaurnt.entity';

@Injectable()
export class RestaurntService {
  constructor(
    @InjectRepository(Restaurnt)
    private readonly restaurntRepository: Repository<Restaurnt>,
  ) {}

  getAll() {
    return this.restaurntRepository.find();
  }
  createRestaurnt(createRestaurntDto: CreateRestaurntDto): Restaurnt {
    return this.restaurntRepository.create(createRestaurntDto);
  }
  updateRestaurnt({ id, data }: UpdateRestaurntDto) {
    return this.restaurntRepository.update(id, { ...data });
  }
}
