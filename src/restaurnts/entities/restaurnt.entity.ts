import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// entitiy , graphql Schema 하나로 정의함.
// DTO 는  class 에서 확장하여 사용 (mapped type)

@ObjectType()
@Entity()
export class Restaurnt {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column()
  @Length(5)
  name: string;

  @Field((type) => Boolean, {
    defaultValue: true,
  }) // this is graphql
  @Column({ default: true }) // this is db
  @IsOptional() // this is validation
  @IsBoolean() // this is validation
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  address: string;

  @Field((type) => String)
  @Column()
  ownerName: string;

  // @Field((type) => String)
  // @Column()
  // categoryName: string;
}
