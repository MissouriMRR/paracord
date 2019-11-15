
import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
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

	@Field(() => [User], {nullable : true})
    @ManyToMany(() => User, user => user.organizations)
	@JoinTable()
	users: User[]
}
