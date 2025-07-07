import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { connection } from "./config/database.js";

import AdminRoute from "./routes/AdminRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import ProdukRoute from "./routes/ProdukRoute.js";
import PenjualRoute from "./routes/PenjualRoute.js";

dotenv.config();
const app = express();

// ✅ Middleware dulu
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto"
    }
}));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); // ← ini juga harus di atas sebelum route

// ✅ Baru route
app.use(AdminRoute);
app.use( CustomerRoute);
app.use( ProdukRoute);
app.use( PenjualRoute);

// ✅ Terakhir: start server
app.listen(process.env.PORT, async () => {
    await connection();
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
