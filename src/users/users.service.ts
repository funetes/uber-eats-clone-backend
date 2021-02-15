import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-Account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verifyEmail.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';

@Injectable()
export class UsersService {
  // need userRepository
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccout({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
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
      const user = await this.userRepository.save(newUser);
      const verification = this.verificationRepository.create({
        user,
      });
      await this.verificationRepository.save(verification);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '계정 생성에 실패했습니다.' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.userRepository.findOne(
        { email },
        { select: ['password', 'id'] },
      );
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
  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.userRepository.findOne({ id });
      if (!user) throw Error();
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: '유저를 찾을 수 없습니다.',
      };
    }
  }
  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      if (!user) throw Error('비 정상적인 접근입니다.');
      if (email) {
        user.email = email;
        user.verified = false;
        const verification = this.verificationRepository.create({
          user,
        });
        await this.verificationRepository.save(verification);
      }
      if (password) user.password = password;
      await this.userRepository.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    const verification = await this.verificationRepository.findOne(
      { code },
      { relations: ['user'] },
    );
    try {
      if (verification) {
        verification.user.verified = true;
        await this.userRepository.save(verification.user);
        return {
          ok: true,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
