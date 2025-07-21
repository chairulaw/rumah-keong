import express from "express";
import { register, login, getProfile, addProfileImage, updateName, updateAlamat, updateNoHp, updatePassword } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/update-name/:id", protect, updateName);
router.put("/update-nohp", protect, updateNoHp);
router.put("/update-password/:id", protect, updatePassword);
router.post("/profile-image", protect, upload.single("foto_profile"), addProfileImage);
router.put("/update-alamat/:id", protect, updateAlamat);

export default router;