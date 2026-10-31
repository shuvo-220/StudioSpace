import express from "express";
import {createBooking, getMyBookings,} from "../controllers/bookingController.js";

import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();


router.post("/bookings", verifyUser, createBooking);
router.get("/my-bookings", verifyUser, getMyBookings);

export default router;
