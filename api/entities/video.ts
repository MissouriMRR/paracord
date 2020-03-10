import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Video extends BaseEntity {
  @Field(() => ID)
  @Index({ unique: true })
  @PrimaryColumn()
  id: string

  @Field()
  @Column()
  url: string

  @Field()
  @CreateDateColumn()
  readonly added: Date
}