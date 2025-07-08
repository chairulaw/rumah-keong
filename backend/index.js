import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import tokoRoutes from "./routes/tokoRoutes.js";
// import produkRoutes from "./routes/produkRoutes.js";
// import transaksiRoutes from "./routes/transaksiRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/toko", tokoRoutes);
// app.use("/api/produk", produkRoutes);
// app.use("/api/transaksi", transaksiRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
