
import { Field, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from "./user"
import { Drone } from "./drone"
import { Lazy } from "./helpers"

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	name: string

	@Field(() => [User])
	@ManyToMany(() => User, user => user.organizations, {nullable : true, lazy: true})
	@JoinTable()
	users: Lazy<User[]>

	@Field(() => [Drone])
    @OneToMany(() => Drone, (drone: Drone) => drone.organization, { nullable: true, lazy: true })
    drones: Lazy<Drone[]>
}
