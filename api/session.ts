import { Field, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinTable } from "typeorm"
import { Lazy } from "./helpers"
import { Flight } from "./flight"
import { User } from "./user"
import { Drone } from "./drone"

@ObjectType()
@Entity()
export class Session extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    purpose: string

    @Field()
    @Column()
    location: string

    @Field()
    @Column()
    terrain: string

    @Field()
    @Column()
    weather: string

    @Field()
    @CreateDateColumn()
    startTime: Date

    @Field()
    @UpdateDateColumn()
    endTime: Date

    @Field()
    @Column()
    description: string

    @Field()
    @Column({nullable : true})
    outcome: string

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight: Flight) => flight.session, { nullable: true, lazy: true })
    flights: Lazy<Flight[]>

    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.sessions, { nullable : true, lazy: true })
    user: Lazy<User>
}
