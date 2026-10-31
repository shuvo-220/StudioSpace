import express from "express";
import { addlisting, getAllStudios, getSingleStudio,getMyStudios } from "../controllers/studioController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/studios", getAllStudios);
router.get("/studios/:id", getSingleStudio);

router.post("/add-listing", verifyUser, addlisting);
router.get("/my-listings", verifyUser, getMyStudios);

export default router;