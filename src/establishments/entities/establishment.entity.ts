import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  motorcycle_parking_qty: number;

  @Column()
  car_parking_qty: number;
}
