import express from "express";
import { addlisting, getAllStudios } from "../controllers/studioController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/studios", getAllStudios);

// Protected route
router.post("/add-listing", verifyUser, addlisting);

export default router;