import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllToko,
  getSalesByTokoId,
  getTokoById,
  getMyToko,
  updateToko
} from "../controllers/tokoController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// ⚠️ Urutan penting: "/me" harus sebelum "/:id"
router.get("/me", protect, getMyToko);
router.put("/me", protect, upload.single("logo_toko"), updateToko);

router.get("/", getAllToko);
router.get("/my-sales", protect, getSalesByTokoId);
router.get("/:id", getTokoById);

export default router;
