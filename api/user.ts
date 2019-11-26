import { Field, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm"
import { Organization } from "./organization"
import { Session } from "./session"
import { Lazy } from "./helpers"

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
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

	@Field(() => [Session])
    @OneToMany(() => Session, (session: Session) => session.user, { nullable: true, lazy: true })
    sessions: Lazy<Session[]>
}
