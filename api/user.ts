import { Field, ID, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm"
import { Organization } from "./organization"
import { Lazy } from "./helpers"

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
	@ManyToMany(() => Organization, organization => organization.users, {nullable : true, lazy: true})
	organizations: Lazy<Organization[]>
}
