import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import {authorizeRoles} from "../middlewares/roleMiddlewares.js";
import {
    konfirmasiTransaksi,
    getInvoicesForUser,
    getSnapToken,
    getTransactionByKode,
    getMyTransaksiPembeli,
    getInvoiceById,
    getAnalytics,
    getMyTokoTransaksi,
    updateStatusByPembeli,
    updateStatusByPenjual,
    updateTransaksiStatus
} from "../controllers/transaksiController.js";

const router = express.Router();

router.post("/konfirmasi", protect, authorizeRoles("Pembeli"), konfirmasiTransaksi);
router.post("/snap-token", protect, authorizeRoles("Pembeli"), getSnapToken);

// Pindahkan ini ke bawah
router.get("/pembeli", protect, authorizeRoles("Pembeli"), getMyTransaksiPembeli);
router.get("/pembeli/:id/invoice", protect, authorizeRoles("Pembeli"), getInvoiceById);
router.get("/pembeli/invoices", protect, authorizeRoles("Pembeli"), getInvoicesForUser);
router.get("/analytics", protect, authorizeRoles("Admin"), getAnalytics);
router.get("/toko", protect, authorizeRoles("Penjual"), getMyTokoTransaksi);
router.put("/status/proses/:id", protect, authorizeRoles("Pembeli"), updateStatusByPembeli);
router.put("/status/diterima/:id", protect, authorizeRoles("Penjual"), updateStatusByPenjual);
router.put("/status/:id", protect, authorizeRoles("Penjual"), updateTransaksiStatus);

// TARUH PALING BAWAH
router.get("/:kode_transaksi", protect, authorizeRoles("Pembeli"), getTransactionByKode);


export default router;