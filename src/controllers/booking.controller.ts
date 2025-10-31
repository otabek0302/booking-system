import { Request, Response } from 'express';
import { BookingService } from '@services/booking.service';
import { ApiError } from '@utils/api.error';

export class BookingController {
  private bookingService = new BookingService();

  getAllBookings = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { bookings, total } = await this.bookingService.getAllBookings(page, limit);
      
      res.json({
        success: true,
        data: bookings,
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
        error: error instanceof Error ? error.message : 'Failed to fetch bookings',
      });
    }
  };

  getBookingById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.getBookingById(id);
      
      res.json({
        success: true,
        data: booking,
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
          error: 'Failed to fetch booking',
        });
      }
    }
  };

  createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      const booking = await this.bookingService.createBooking(req.body, eventId);
      
      res.status(201).json({
        success: true,
        data: booking,
        message: 'Booking created successfully',
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
          error: 'Failed to create booking',
        });
      }
    }
  };

  updateBooking = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.updateBooking(id, req.body);
      
      res.json({
        success: true,
        data: booking,
        message: 'Booking updated successfully',
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
          error: 'Failed to update booking',
        });
      }
    }
  };

  cancelBooking = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.cancelBooking(id);
      
      res.json({
        success: true,
        data: booking,
        message: 'Booking cancelled successfully',
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
          error: 'Failed to cancel booking',
        });
      }
    }
  };

  deleteBooking = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.bookingService.deleteBooking(id);
      
      res.json({
        success: true,
        message: 'Booking deleted successfully',
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
          error: 'Failed to delete booking',
        });
      }
    }
  };
}

