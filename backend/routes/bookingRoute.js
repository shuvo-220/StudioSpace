import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/bookings", verifyUser, createBooking);

export default router;