import { Router } from 'express';
import { BookingController } from '@controllers/booking.controller';

const router = Router();
const bookingController = new BookingController();

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/event/:eventId', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.put('/:id/cancel', bookingController.cancelBooking);
router.delete('/:id', bookingController.deleteBooking);

export default router;

