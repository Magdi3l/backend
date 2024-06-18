import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ahorro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  type: string;
}
