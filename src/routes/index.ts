import { Router } from "express";
import eventRoutes from "./event.routes";
import bookingRoutes from "./booking.routes";

const router = Router();

router.use("/events", eventRoutes);
router.use("/bookings", bookingRoutes);

export default router;