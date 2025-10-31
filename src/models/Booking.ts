import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './Event';

// Модель бронирования - связывает пользователя с событием
@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Event, (event) => event.bookings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "event_id" })
  event!: Event;

  @Column()
  user_id!: string;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
