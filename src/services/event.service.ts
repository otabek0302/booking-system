import { AppDataSource } from '@config/database';
import { Event } from '@models/Event';
import { ApiError } from '@utils/api.error';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);

  async getAllEvents(page: number = 1, limit: number = 10): Promise<{ events: Event[]; total: number }> {
    const skip = (page - 1) * limit;
    const [events, total] = await this.eventRepository.findAndCount({
      where: { isActive: true },
      order: { startDate: 'ASC' },
      skip,
      take: limit,
    });

    return { events, total };
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });

    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    return event;
  }

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    await this.eventRepository.save(event);
    return event;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    const event = await this.getEventById(id);
    Object.assign(event, eventData);
    await this.eventRepository.save(event);
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    const event = await this.getEventById(id);
    await this.eventRepository.remove(event);
  }

  async getAvailableEvents(): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.isActive = :isActive', { isActive: true })
      .andWhere('event.startDate > :now', { now: new Date() })
      .andWhere('event.bookedCount < event.capacity')
      .orderBy('event.startDate', 'ASC')
      .getMany();
  }
}

