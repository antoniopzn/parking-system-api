import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Vehicle {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    color: string

    @Column()
    plate: string

    @Column()
    type: string
}
