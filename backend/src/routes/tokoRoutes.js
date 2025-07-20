import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getAllToko, getTokoById, getMyToko, updateToko } from "../controllers/tokoController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Routes for toko
router.get("/me", protect, getMyToko);
router.get("/", getAllToko);
router.get("/:id", getTokoById); // Assuming getTokoById is defined in the controller
router.put("/toko/me", upload.single("logo_toko"), protect, updateToko);

export default router;
