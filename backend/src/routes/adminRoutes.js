import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddlewares.js";
import { getAdminStats, getAllTransactions } from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/all-transactions",  getAllTransactions);


export default router;
