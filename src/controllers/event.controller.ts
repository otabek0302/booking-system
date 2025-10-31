import { Request, Response } from 'express';
import { EventService } from '@services/event.service';
import { ApiError } from '@utils/api.error';

export class EventController {
  private eventService = new EventService();

  getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { events, total } = await this.eventService.getAllEvents(page, limit);
      
      res.json({
        success: true,
        data: events,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch events',
      });
    }
  };

  getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const event = await this.eventService.getEventById(id);
      
      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch event',
        });
      }
    }
  };

  createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await this.eventService.createEvent(req.body);
      
      res.status(201).json({
        success: true,
        data: event,
        message: 'Event created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create event',
      });
    }
  };

  updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const event = await this.eventService.updateEvent(id, req.body);
      
      res.json({
        success: true,
        data: event,
        message: 'Event updated successfully',
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to update event',
        });
      }
    }
  };

  deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.eventService.deleteEvent(id);
      
      res.json({
        success: true,
        message: 'Event deleted successfully',
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to delete event',
        });
      }
    }
  };

  getAvailableEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await this.eventService.getAvailableEvents();
      
      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch available events',
      });
    }
  };
}

