import { Field, ObjectType, Int } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinTable,
    OneToOne,
} from 'typeorm'
import { Lazy } from '../helpers'
import { Session } from './session'
import { Video } from '../entities/video' 

@ObjectType()
@Entity()
export class Flight extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field({ nullable: true })
    @Column({ nullable: true })
    purpose: string

    @Field({ nullable: true })
    @CreateDateColumn({ nullable: true })
    startTime: Date

    @Field({ nullable: true })
    @UpdateDateColumn({ nullable: true })
    endTime: Date

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    outcome: string

    @Field(() => Session, { nullable: true })
    @ManyToOne(() => Session, (session: Session) => session.flights, {
        nullable: true,
        lazy: true,
    })
    session: Lazy<Session>

    @Field(() => [Video])
    @OneToMany(() => Video, (video: Video) => video.flight, {
        nullable: true,
        lazy: true,
    })
    videos: Lazy<Video[]>

    //The folder Id of the flight on google drive
    @Field({ nullable: true })
    @Column({ nullable: true })
    driveId: string
}
