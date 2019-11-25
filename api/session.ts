import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"

@ObjectType()
@Entity()
export class Session extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
    purpose: string
    
    @Field()
    @CreateDateColumn()
    date: Date

    @Field()
	@Column()
    description: string
}
