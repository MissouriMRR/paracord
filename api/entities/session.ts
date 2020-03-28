import { Field, ObjectType, Int } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinTable,
} from 'typeorm'
import { Lazy } from '../helpers'
import { Flight } from './flight'
import { User } from './user'
import { Drone } from './drone'

@ObjectType()
@Entity()
export class Session extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field({ nullable: true })
    @Column({ nullable: true })
    purpose: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    location: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    terrain: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    weather: string

    @Field()
    @CreateDateColumn()
    startTime: Date

    @Field()
    @UpdateDateColumn()
    endTime: Date

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    outcome: string

    @Field(() => [Flight])
    @OneToMany(() => Flight, (flight: Flight) => flight.session, {
        nullable: true,
        lazy: true,
    })
    flights: Lazy<Flight[]>

    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.sessions, {
        nullable: true,
        lazy: true,
    })
    user: Lazy<User>
}
