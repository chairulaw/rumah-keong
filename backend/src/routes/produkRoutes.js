import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddlewares.js";
import {
    getProdukByToko,
    createProduk,
    updateProduk,
    deleteProduk,
} from "../controllers/produkController.js";


const router = express.Router();

router.get("/", protect, authorizeRoles("Penjual"), getProdukByToko);
router.post("/", protect, authorizeRoles("Penjual"), createProduk);
router.put("/:id", protect, authorizeRoles("Penjual"), updateProduk);
router.delete("/:id", protect, authorizeRoles("Penjual"), deleteProduk);

export default router;