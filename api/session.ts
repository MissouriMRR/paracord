import { Field, ObjectType, Int} from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

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
}
