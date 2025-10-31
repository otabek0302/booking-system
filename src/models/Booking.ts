import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './Event';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  eventId!: string;

  @ManyToOne(() => Event, (event: Event) => event.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event!: Event;

  @Column({ type: 'varchar', length: 255 })
  customerName!: string;

  @Column({ type: 'varchar', length: 255 })
  customerEmail!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  customerPhone?: string;

  @Column({ type: 'int' })
  tickets!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

