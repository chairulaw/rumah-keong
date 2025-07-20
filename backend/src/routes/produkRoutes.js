import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddlewares.js";
import {
    getProdukByToko,
    getProdukByTokoId,
    getProdukById,
    createProduk,
    updateProduk,
    deleteProduk,
} from "../controllers/produkController.js";
import { upload } from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.get("/", protect, authorizeRoles("Penjual"), getProdukByToko);
router.post("/", protect, authorizeRoles("Penjual"), upload.array("gambarProduk", 6), createProduk);
router.get("/:id", getProdukById);
router.get("/toko/:id", getProdukByTokoId);
router.put("/:id", protect, authorizeRoles("Penjual"), updateProduk);
router.delete("/:id", protect, authorizeRoles("Penjual"), deleteProduk);

export default router;