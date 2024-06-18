import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GastoVariable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  type: string; // 'Gasto Variable' o similar, según tus necesidades
}
