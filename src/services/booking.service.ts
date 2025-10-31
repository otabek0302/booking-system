import { AppDataSource } from "@config/index";
import { Event } from "@models/index";
import { Booking } from "@models/index";
import { ApiError } from "@utils/api.error";

// Сервис для работы с бронированиями
export class BookingService {
  private bookingRepo = AppDataSource.getRepository(Booking);
  private eventRepo = AppDataSource.getRepository(Event);

  // Резервирование места на событие
  async reserveBooking(event_id: number, user_id: string): Promise<Booking> {
    // Проверяем существование события
    const event = await this.eventRepo.findOneBy({ id: event_id });
    if (!event) throw ApiError.notFound("Event not found");

    // Проверяем наличие свободных мест
    if (event.total_seats <= 0) throw ApiError.badRequest("No seats available");

    // Проверяем, не забронировал ли уже пользователь это событие
    const existing = await this.bookingRepo.findOne({ where: { event: { id: event_id }, user_id } });
    if (existing) throw ApiError.conflict("User already booked this event");

    // Создаем бронирование
    const booking = this.bookingRepo.create({ event, user_id });
    await this.bookingRepo.save(booking);

    // Уменьшаем количество свободных мест
    event.total_seats -= 1;
    await this.eventRepo.save(event);

    return booking;
  }
}
