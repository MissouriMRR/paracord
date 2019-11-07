
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

    @Field(() => [ID])
    @OneToMany(type => User, user => user.orgid)
    users: User[];
}
