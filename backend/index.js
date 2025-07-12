import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import tokoRoutes from "./src/routes/tokoRoutes.js";
import produkRoutes from "./src/routes/produkRoutes.js";
import transaksiRoutes from "./src/routes/transaksiRoutes.js";
import detailRoutes from "./src/routes/detailRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/toko", tokoRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/detail", detailRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
