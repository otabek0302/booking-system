import { Request, Response } from "express";
import { EventService } from "@services/index";

// Контроллер для обработки запросов событий
export class EventController {
  private eventService = new EventService();

  // Получение всех событий
  getAllEvents = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const clampedLimit = Math.min(limit, 100);

    const { events, total } = await this.eventService.getAllEvents(page, clampedLimit);

    res.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit: clampedLimit,
        total,
        totalPages: Math.ceil(total / clampedLimit),
      },
    });
  };

  // Получение события по ID
  getEventById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const event = await this.eventService.getEventById(Number(id));

    res.json({
      success: true,
      data: event,
    });
  };

  // Создание нового события
  createEvent = async (req: Request, res: Response): Promise<void> => {
    const event = await this.eventService.createEvent(req.body);

    res.status(201).json({
      success: true,
      data: event,
      message: "Event created successfully",
    });
  };

  // Обновление события
  updateEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const event = await this.eventService.updateEvent(Number(id), req.body);

    res.json({
      success: true,
      data: event,
      message: "Event updated successfully",
    });
  };

  // Удаление события
  deleteEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.eventService.deleteEvent(Number(id));

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  };

  // Получение доступных событий
  getAvailableEvents = async (req: Request, res: Response): Promise<void> => {
    const events = await this.eventService.getAvailableEvents();

    res.json({
      success: true,
      data: events,
    });
  };
}
