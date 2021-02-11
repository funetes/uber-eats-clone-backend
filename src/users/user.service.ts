import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // need user repository
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
}
