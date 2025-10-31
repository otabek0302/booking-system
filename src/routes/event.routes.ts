import { Router } from 'express';
import { EventController } from '@controllers/event.controller';
import { asyncHandler } from "@utils/index";

const router = Router();
const eventController = new EventController();

router.get('/', asyncHandler(eventController.getAllEvents.bind(eventController)));
router.get('/available', asyncHandler(eventController.getAvailableEvents.bind(eventController)));
router.get('/:id', asyncHandler(eventController.getEventById.bind(eventController)));
router.post('/', asyncHandler(eventController.createEvent.bind(eventController)));
router.put('/:id', asyncHandler(eventController.updateEvent.bind(eventController)));
router.delete('/:id', asyncHandler(eventController.deleteEvent.bind(eventController)));

export default router;

