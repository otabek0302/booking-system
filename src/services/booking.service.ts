import { AppDataSource } from '@config/database';
import { Booking, BookingStatus } from '@models/Booking';
import { Event } from '@models/Event';
import { ApiError } from '@utils/api.error';

export class BookingService {
  private bookingRepository = AppDataSource.getRepository(Booking);
  private eventRepository = AppDataSource.getRepository(Event);

  async getAllBookings(page: number = 1, limit: number = 10): Promise<{ bookings: Booking[]; total: number }> {
    const skip = (page - 1) * limit;
    const [bookings, total] = await this.bookingRepository.findAndCount({
      relations: ['event'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return { bookings, total };
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['event'],
    });

    if (!booking) {
      throw ApiError.notFound('Booking not found');
    }

    return booking;
  }

  async createBooking(bookingData: Partial<Booking>, eventId: string): Promise<Booking> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });

    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    if (!event.isActive) {
      throw ApiError.badRequest('Event is not active');
    }

    if (new Date(event.startDate) < new Date()) {
      throw ApiError.badRequest('Event has already started');
    }

    const availableSpots = event.capacity - event.bookedCount;
    if (bookingData.tickets! > availableSpots) {
      throw ApiError.badRequest(`Only ${availableSpots} tickets available`);
    }

    const booking = this.bookingRepository.create({
      ...bookingData,
      eventId,
      totalAmount: event.price * bookingData.tickets!,
      status: BookingStatus.CONFIRMED,
    });

    event.bookedCount += bookingData.tickets!;
    await this.eventRepository.save(event);
    await this.bookingRepository.save(booking);

    return await this.getBookingById(booking.id);
  }

  async updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking> {
    const booking = await this.getBookingById(id);
    Object.assign(booking, bookingData);
    await this.bookingRepository.save(booking);
    return booking;
  }

  async cancelBooking(id: string): Promise<Booking> {
    const booking = await this.getBookingById(id);

    if (booking.status === BookingStatus.CANCELLED) {
      throw ApiError.badRequest('Booking is already cancelled');
    }

    booking.status = BookingStatus.CANCELLED;

    // Release the tickets back to the event
    const event = await this.eventRepository.findOne({ where: { id: booking.eventId } });
    if (event) {
      event.bookedCount -= booking.tickets;
      await this.eventRepository.save(event);
    }

    await this.bookingRepository.save(booking);
    return booking;
  }

  async deleteBooking(id: string): Promise<void> {
    const booking = await this.getBookingById(id);
    await this.bookingRepository.remove(booking);
  }
}

