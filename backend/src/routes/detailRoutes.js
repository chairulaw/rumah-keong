import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddlewares.js";

import {
    createDetail,
    updateDetail,
    deleteDetail,
} from "../controllers/detailController.js";

const router = express.Router();

//Admin only
router.post("/", protect, authorizeRoles("admin"), createDetail);
router.put("/:id", protect, authorizeRoles("admin"), updateDetail);
router.delete("/:id", protect, authorizeRoles("admin"), deleteDetail); 

export default router;