import { Field, ID, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Video extends BaseEntity {
    //Database ID
    @Field(() => ID)
    @Index({ unique: true })
    @PrimaryColumn()
    id: string

    //Google drive ID
    @Field()
    @Column()
    driveId: string

    @Field()
    @CreateDateColumn()
    readonly added: Date
}
