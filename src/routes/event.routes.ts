import { Router } from 'express';
import { EventController } from '@controllers/event.controller';

const router = Router();
const eventController = new EventController();

router.get('/', eventController.getAllEvents);
router.get('/available', eventController.getAvailableEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;

