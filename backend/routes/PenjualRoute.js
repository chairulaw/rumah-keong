import express from "express";
import { createPenjual,
    getPenjual,
    getPenjualById,
    updatePenjual,
    deletePenjual } from "../controller/Penjual.js";

const router = express.Router();

router.get("/Penjual/", getPenjual);
router.get("/Penjual/:id", getPenjualById);
router.post("/Penjual/", createPenjual);
router.put("/Penjual/:id", updatePenjual);
router.delete("/Penjual/:id", deletePenjual);

export default router;