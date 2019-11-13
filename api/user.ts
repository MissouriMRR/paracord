
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Organization } from "./organization";
import { RelationColumn } from "./helpers";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	password: string;
	
	@ManyToOne(() => Organization)
	organization: Organization;
	@RelationColumn()
	orgid: number;
}
