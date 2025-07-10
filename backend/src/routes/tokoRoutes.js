import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddlewares.js";
import { getMyToko, updateToko } from "../controllers/tokoController.js";

const router = express.Router();

router.get("/me", protect, authorizeRoles("Penjual"), getMyToko);
router.put("/me", protect, authorizeRoles("Penjual"), updateToko);

export default router;