import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import {authorizeRoles} from "../middlewares/roleMiddleware.js";
import {
    getMyTransaksiPembeli,
    getMyTokoTransaksi,
    updateStatusByPembeli,
    updateStatusByPenjual
} from "../controllers/transaksiController.js";

const router = express.Router();

router.get("/pembeli", protect, authorizeRoles("Pembeli"), getMyTransaksiPembeli);
router.get("/toko", protect, authorizeRoles("Penjual"), getMyTokoTransaksi);
router.put("/status/proses/:id", protect, authorizeRoles("Pembeli"), updateStatusByPembeli);
router.put("/status/diterima/:id", protect, authorizeRoles("Penjual"), updateStatusByPenjual);

export default router;