
import mongoose from "mongoose";
import Studio from "../models/studioModel.js";
import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const { studioId, startAt, endAt } = req.body;

    if (!studioId || !startAt || !endAt) {
      return res.status(400).json({
        success: false,
        message: "Studio ID, start time and end time are required!",
      });
    }

    if (!mongoose.isValidObjectId(studioId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid studio ID!",
      });
    }

    const studio = await Studio.findById(studioId);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found!",
      });
    }

    const start = new Date(startAt);
    const end = new Date(endAt);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking date!",
      });
    }

    if (start <= new Date() || end <= start) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid future booking time!",
      });
    }

    if (
      studio.hostEmail.toLowerCase() ===
      req.user.email.toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot book your own studio!",
      });
    }

    const conflictingBooking = await Booking.findOne({
      studio: studio._id,
      status: "Confirmed",
      startAt: { $lt: end },
      endAt: { $gt: start },
    });

    if (conflictingBooking) {
      return res.status(409).json({
        success: false,
        message:
          "This studio is already booked for the selected time!",
      });
    }

    const totalHours =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    const totalCost =
      totalHours * studio.hourlyRate + studio.securityDeposit;

    const booking = await Booking.create({
      studio: studio._id,
      studioTitle: studio.title,
      creatorName: req.user.name,
      creatorEmail: req.user.email,
      hostName: studio.hostName,
      hostEmail: studio.hostEmail,
      startAt: start,
      endAt: end,
      hourlyRate: studio.hourlyRate,
      securityDeposit: studio.securityDeposit,
      totalHours,
      totalCost,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Booking request created successfully!",
      data: booking,
    });

  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};



export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      creatorEmail: req.user.email.toLowerCase(),
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "My bookings fetched successfully!",
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get my bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};



export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID!",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found!",
      });
    }

    if (
      booking.creatorEmail.toLowerCase() !==
      req.user.email.toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to cancel this booking!",
      });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be cancelled!",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully!",
      data: booking,
    });

  } catch (error) {
    console.error("Cancel booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
