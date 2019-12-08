import { Field, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinTable } from "typeorm"
import { Lazy } from "./helpers"
import { Session } from "./session"
import { User } from "./user"

@ObjectType()
@Entity()
export class Flight extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    purpose: string

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

    @Field(() => Session)
    @ManyToOne(() => Session, (session: Session) => session.flights, { nullable : true, lazy: true })
    session: Lazy<Session>
}