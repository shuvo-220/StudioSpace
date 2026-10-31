import Studio from "../models/studioModel.js";
import mongoose from "mongoose";

export const addlisting = async (req, res) => {
  try {
    const {
      title,
      category,
      hourlyRate,
      securityDeposit,
      maxCapacity,
      location,
      imageUrl,
      amenities,
      overview,
    } = req.body;

    const newStudio = await Studio.create({
      title,
      category,
      hourlyRate,
      securityDeposit,
      maxCapacity,
      location,
      imageUrl,
      amenities,
      overview,

      // Authenticated user information
      hostName: req.user.name,
      hostEmail: req.user.email,
    });

    res.status(201).json({
      success: true,
      message: "Studio added successfully!",
      data: newStudio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllStudios = async (req, res) => {
  try {
    const studios = await Studio.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Studios fetched successfully!",
      total: studios.length,
      data: studios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSingleStudio = async (req, res) => {
  try {
    const { id } = req.params;

    const studio = await Studio.findById(id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Studio fetched successfully!",
      data: studio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyStudios = async (req, res) => {
  try {
    const studios = await Studio.find({
      hostEmail: req.user.email.toLowerCase(),
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Your studios fetched successfully!",
      total: studios.length,
      data: studios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudio = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid studio ID!",
      });
    }

    // Find studio
    const studio = await Studio.findById(id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found!",
      });
    }

    // Check ownership
    if (studio.hostEmail !== req.user.email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this studio!",
      });
    }

    // Only allow these fields to be updated
    const allowedFields = [
      "title",
      "category",
      "hourlyRate",
      "securityDeposit",
      "maxCapacity",
      "location",
      "imageUrl",
      "amenities",
      "overview",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedStudio = await Studio.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Studio updated successfully!",
      data: updatedStudio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteStudio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid studio ID!",
      });
    }

    const studio = await Studio.findById(id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found!",
      });
    }

    if (studio.hostEmail !== req.user.email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this studio!",
      });
    }

    await Studio.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Studio deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};