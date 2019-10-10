import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Flight {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    terrain: string;

    @Column()
    weather: string;
    
    @Column()
    date: String;
}
