import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Common } from 'src/common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
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
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ type: 'text', select: false })
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRule })
  @Field((type) => UserRule)
  @IsEnum(UserRule)
  role: UserRule;

  @Column({ default: false })
  @Field((type) => Boolean)
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async passwordHash() {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException();
      }
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
