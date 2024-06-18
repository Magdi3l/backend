import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ahorro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  type: string;
}
