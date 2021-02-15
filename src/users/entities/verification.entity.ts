import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Common } from 'src/common/entities/common.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends Common {
  @Field((type) => String)
  @Column()
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode() {
    this.code = uuidv4();
  }
}
