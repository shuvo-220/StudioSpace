import express from "express";
import { addlisting, getAllStudios, getSingleStudio,getMyStudios,updateStudio,deleteStudio } from "../controllers/studioController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/studios", getAllStudios);
router.get("/studios/:id", getSingleStudio);

router.post("/add-listing", verifyUser, addlisting);
router.get("/my-listings", verifyUser, getMyStudios);
router.put("/studios/edit/:id", verifyUser, updateStudio);
router.delete("/studios/:id", verifyUser, deleteStudio);

export default router;