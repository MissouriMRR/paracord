import { Field, ObjectType, Int } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm"
import { Organization } from "./organization"
import { Lazy } from "./helpers"

@ObjectType()
@Entity()
export class Drone extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	name: string

	@Field(() => Organization)
	@ManyToOne(() => Organization, organization => organization.drones, {nullable : true, lazy: true})
	organization: Lazy<Organization>
}
