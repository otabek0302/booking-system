import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Booking } from './Booking';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Column({ type: 'int' })
  capacity!: number;

  @Column({ type: 'int', default: 0 })
  bookedCount!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

