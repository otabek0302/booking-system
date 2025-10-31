import { Request, Response } from "express";
import { BookingService } from "@services/index";

// Контроллер для обработки запросов бронирования
export class BookingController {
  private bookingService = new BookingService();

  // Резервирование места на событие
  reserve = async (req: Request, res: Response) => {
    const { event_id, user_id } = req.body;
    if (!event_id || !user_id)
      return res.status(400).json({ success: false, message: "event_id and user_id required" });

    const booking = await this.bookingService.reserveBooking(Number(event_id), user_id);
    
    // Формируем ответ в нужном формате
    const responseData = {
      id: booking.id,
      event_id: Number(event_id),
      user_id: booking.user_id,
      created_at: booking.created_at,
    };
    
    return res.status(201).json({ success: true, data: responseData, message: "Booking successful" });
  };
}
