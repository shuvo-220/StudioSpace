import express from "express";
import { addlisting } from "../controllers/studioController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

// Protected route
router.post("/add-listing", verifyUser, addlisting);

export default router;