import { Field, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm'
import { Flight } from '../entities/flight' 
import { Lazy } from '../helpers'

@ObjectType()
@Entity()
export class Video extends BaseEntity {
    //Database ID
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    //Google drive ID
    @Field()
    @Column()
    driveId: string

    @Field()
    @CreateDateColumn()
    readonly added: Date

    @Field(() => Flight, { nullable: true })
    @ManyToOne(() => Flight, (flight: Flight) => flight.videos, {
        nullable: true,
        lazy: true,
    })
    flight: Lazy<Flight>
}
