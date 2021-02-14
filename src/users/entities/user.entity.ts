import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Common } from 'src/common/entities/common.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

enum UserRule {
  client,
  owner,
  deliver,
}

registerEnumType(UserRule, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends Common {
  @Column({ type: 'text' })
  @Field((is) => String)
  @IsEmail()
  email: string;

  @Column({ type: 'text' })
  @Field((is) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRule })
  @Field((is) => UserRule)
  @IsEnum(UserRule)
  role: UserRule;

  @BeforeInsert()
  async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(password): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
