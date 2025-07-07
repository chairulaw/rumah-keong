import express from "express";
import { createAdmin, updateAdmin } from "../controller/admin.js";

const router = express.Router();

router.post("/admin/", createAdmin);
router.put("/admin/:id", updateAdmin);

export default router;
