import express from "express";
import {cancelBooking, createBooking, getMyBookings,} from "../controllers/bookingController.js";

import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();


router.post("/bookings", verifyUser, createBooking);
router.get("/my-bookings", verifyUser, getMyBookings);
router.patch("/bookings/:id/cancel", verifyUser, cancelBooking);

export default router;
