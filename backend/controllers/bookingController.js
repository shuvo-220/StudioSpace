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

    if (studio.hostEmail === req.user.email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "You cannot book your own studio!",
      });
    }

    const totalHours = (end - start) / (1000 * 60 * 60);

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

    res.status(201).json({
      success: true,
      message: "Booking request created successfully!",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};