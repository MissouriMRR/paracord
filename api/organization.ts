
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

	@Field(type => [User])
    @OneToMany(() => User, (user) => user.organization, { cascade: ["insert"] })
    users: User[];
}
