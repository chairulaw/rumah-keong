import express from "express";
import { register, login, addProfileImage, updateName, updateAlamat,updatePassword } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-name/:id", protect, updateName);
router.put("/update-password/:id", protect, updatePassword);
router.post("/profile-image/:id", protect, addProfileImage);
router.put("/update-alamat/:id", protect, updateAlamat);

export default router;