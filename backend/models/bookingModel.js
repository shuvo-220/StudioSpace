import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: true,
    },

    studioTitle: {
      type: String,
      required: true,
    },

    creatorName: {
      type: String,
      required: true,
    },

    creatorEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    hostName: {
      type: String,
      required: true,
    },

    hostEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      required: true,
    },

    hourlyRate: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },

    totalHours: {
      type: Number,
      required: true,
    },

    totalCost: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;