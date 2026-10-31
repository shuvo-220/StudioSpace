
import mongoose from "mongoose";

const studioSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Photography Studio",
                "Film Stage",
                "Podcast Room",
                "Music Studio",
                "Workshop",
            ],
        },
        hourlyRate: {
            type: Number,
            required: true,
            min: 0,
        },
        securityDeposit: {
            type: Number,
            required: true,
            min: 0,
        },
        maxCapacity: {
            type: Number,
            required: true,
            min: 1,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        amenities: {
            type: [String],
            default: [],
        },
        overview: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

const Studio = mongoose.model("Studio", studioSchema);

export default Studio;
