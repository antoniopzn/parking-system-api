import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true})
    id_establishment: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
}
