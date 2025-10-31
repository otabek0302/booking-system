import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './Booking';

// Модель события - хранит информацию о мероприятии
@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "int" })
  total_seats!: number;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];
}

