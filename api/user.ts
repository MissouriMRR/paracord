import { Field, ID, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm"
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
	
	@Field(() => [Organization], {nullable : true})
	@ManyToMany(() => Organization, organization => organization.users)
	organizations: Organization[]
}
