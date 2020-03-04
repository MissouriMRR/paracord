import { Field, ObjectType, Int } from "type-graphql"
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
} from "typeorm"

@ObjectType()
@Entity()
export class Drone extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string
}
