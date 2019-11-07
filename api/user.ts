
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => ID)
	//TODO: Relation shid
	orgid: number;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	password: string;	
}
