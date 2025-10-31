import { AppDataSource } from "@config/index";
import { Event } from "@models/index";
import { ApiError } from "@utils/index";

// Сервис для работы с событиями
export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);

  // Получение всех событий с пагинацией
  async getAllEvents(page: number = 1, limit: number = 10): Promise<{ events: Event[]; total: number }> {
    const skip = (page - 1) * limit;
    const [events, total] = await this.eventRepository.findAndCount({
      skip,
      take: limit,
    });

    return { events, total };
  }

  // Получение события по ID
  async getEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ["bookings"],
    });

    if (!event) {
      throw ApiError.notFound("Event not found");
    }

    return event;
  }

  // Создание нового события
  async createEvent(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    await this.eventRepository.save(event);
    return event;
  }

  // Обновление события
  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
    const event = await this.getEventById(id);
    Object.assign(event, eventData);
    await this.eventRepository.save(event);
    return event;
  }

  // Удаление события
  async deleteEvent(id: number): Promise<void> {
    const event = await this.getEventById(id);
    await this.eventRepository.remove(event);
  }

  // Получение доступных событий
  async getAvailableEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }
}
