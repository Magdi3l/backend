import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingreso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
