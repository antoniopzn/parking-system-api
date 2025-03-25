import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_establishment: string;

  @Column()
  id_vehicle: string;

  @Column()
  dh_entry: Date;

  @Column({ nullable: true })
  dh_exit: Date;
}
