import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Establishment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    cnpj: string

    @Column()
    address: string

    @Column()
    phone: number

    @Column()
    motorcycle_parking_qty: string

    @Column()
    car_parking_qty: string
}
