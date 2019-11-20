import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Lazy } from "../src/helpers"
import { Organization } from "./organization"

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	email: string

	@Field()
	@Column()
	password: string

	@Field(() => [Organization])
	@ManyToMany(() => Organization, organization => organization.users, { nullable: true, lazy: true })
	organizations: Lazy<Organization[]>
}
