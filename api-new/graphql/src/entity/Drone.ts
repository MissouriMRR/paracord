import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Drone {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
