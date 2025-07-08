import bcrypt from "bcryptjs";
import db from "../config/db.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password, nama, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (existing.length)
    return res.status(400).json({ message: "Email exists" });

  const [result] = await db.query(
    "INSERT INTO users (email, password, nama, role) VALUES (?, ?, ?, ?)",
    [email, hashed, nama, role || "Pembeli"]
  );
  const user = { id: result.insertId, email, role };
  res.status(201).json({ ...user, token: generateToken(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length)
    return res.status(401).json({ message: "Invalid credentials" });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};
