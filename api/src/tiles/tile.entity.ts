import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { User } from '../users/user.entity'

@Entity()
@ObjectType()
export class Tile {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Column('int')
  @Field(() => Int)
  x: number

  @Column('int')
  @Field(() => Int)
  y: number

  @Column()
  @Field(() => String)
  color: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
