import { Router } from "express";
import { BookingController } from "@controllers/index";
import { asyncHandler } from "@utils/index";

const router = Router();
const controller = new BookingController();

router.post("/reserve", asyncHandler(controller.reserve.bind(controller)));

export default router;
