import { Field, ObjectType, Int } from "type-graphql"
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
} from "typeorm"
import { Lazy } from "../helpers"
import { Mission } from "./mission"
import { User } from "./user"
import { Frame } from "./frame"

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

    @Field(() => [Mission])
    @OneToMany(
        () => Mission,
        (mission: Mission) => mission.session,
        {
            nullable: true,
            lazy: true,
        },
    )
    missions: Lazy<Mission[]>

    @Field(() => User)
    @ManyToOne(
        () => User,
        (user: User) => user.sessions,
        {
            nullable: true,
            lazy: true,
        },
    )
    user: Lazy<User>
}
