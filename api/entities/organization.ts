import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Lazy } from "../src/helpers"
import { User } from "./user"

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	name: string

	@Field(() => [User])
	@ManyToMany(() => User, user => user.organizations, { nullable: true, lazy: true })
	@JoinTable()
	users: Lazy<User[]>
}
