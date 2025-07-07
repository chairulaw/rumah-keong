import express from "express";
import { createProduk,
    getProduk,
    getProdukById,
    updateProduk,
    deleteProduk } from "../controller/Produk.js";

const router = express.Router();

router.get("/Produk/", getProduk);
router.get("/Produk/:id", getProdukById);
router.post("/Produk/", createProduk);
router.put("/Produk/:id", updateProduk);
router.delete("/Produk/:id", deleteProduk);

export default router;