import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurnt } from './entities/restaurnt.entity';

@Injectable()
export class RestaurntService {
  constructor(
    @InjectRepository(Restaurnt)
    private restaurntRepository: Repository<Restaurnt>,
  ) {}

  getAll() {
    return this.restaurntRepository.find();
  }
}
