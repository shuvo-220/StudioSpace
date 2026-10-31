import Studio from "../models/studioModel.js";

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