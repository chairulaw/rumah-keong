import express from "express";
import { getUserProfileById, getAllUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", getUserProfileById);
router.get("/", getAllUserProfile);

export default router;
