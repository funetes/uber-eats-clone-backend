import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-Account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  // need userRepository
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccout({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string | undefined }> {
    try {
      const exist = await this.userRepository.findOne({ email });
      if (exist) return { ok: false, error: '이미 존재하는 유저입니다.' };
      // crete user
      const newUser = this.userRepository.create({
        email,
        password,
        role,
      });
      // save
      await this.userRepository.save(newUser);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '계정 생성에 실패했습니다.' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{
    ok: boolean;
    error?: string | undefined;
    token?: string;
  }> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user)
        return {
          ok: false,
          error: '유저를 찾을수 없습니다.',
        };
      // check password
      const isCorrect = await user.checkPassword(password);
      if (!isCorrect)
        return {
          ok: false,
          error: '잘못된 비밀번호 입니다. 비밀번호를 확인해 주세요.',
        };
      // token
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ id });
  }
}
