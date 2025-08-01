import bcrypt from "bcryptjs";
import db from "../config/database.js";
import generateToken from "../utils/generateToken.js";
import multer from "multer";
import path from "path";

export const register = async (req, res) => {
  const { email, password, nama, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length)
      return res.status(400).json({ message: "Email exists" });

    // 1. Insert user ke tabel users
    const [result] = await db.query(
      "INSERT INTO users (email, password, nama, role) VALUES (?, ?, ?, ?)",
      [email, hashed, nama, role || "Pembeli"]
    );

    const userId = result.insertId;
    const user = { id: userId, email, role: role || "Pembeli" };

    // 2. Jika role = Penjual, buat entri baru di tabel tokos
    if (role === "Penjual") {
      await db.query(
        "INSERT INTO tokos (owner_id, nama, email) VALUES (?, ?, ?)",
        [userId, nama, email]
      );
    }

    // 3. Return response
    res.status(201).json({ ...user, token: generateToken(user) });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Register failed" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (!rows.length) {
      return res.status(401).json({ message: "Email atau Password Salah!" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Email atau Password Salah!" });
    }

    // Berhasil login
    res.json({
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const addProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const filename = req.file.filename;

    const imagePath = `uploads/${filename}`;

    const sql = "UPDATE users SET foto_profile = ? WHERE id = ?";
    db.query(sql, [imagePath, userId], (err, result) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ message: "Database update failed" });
      }

      res.status(200).json({
        message: "Foto profil berhasil diupload",
        imagePath,
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Error uploading profile image",
      error: error.message,
    });
  }
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

export const upload = multer({ storage });

export const getProfile = async (req, res) => {
    const [rows] = await db.query("SELECT id, nama, email, no_hp, alamat, foto_profile FROM users WHERE id = ?", [req.user.id]);
  if (!rows.length) return res.status(404).json({ message: "User not found" });
  res.json(rows[0]);
}

export const updateName = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: user not found" });
  }
  const { name } = req.body;
  const id = req.user.id;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const [result] = await db.query("UPDATE users SET nama = ? WHERE id = ?", [name, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Name updated successfully" });
  } catch (error) {
    console.error("Error updating name:", error);
    res.status(500).json({ message: "Error updating name", error: error.message });
  }
}

export const updateAlamat = async (req, res) => {
  if(!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: user not found" });
  }

  const { alamat } = req.body;
  const id = req.user.id;

  if (!alamat) {
    return res.status(400).json({ message: "Alamat is required" });
  }

  try {
    const [result] = await db.query("UPDATE users SET alamat = ? WHERE id = ?", [alamat , id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Alamat updated successfully" });
  } catch (error) {
    console.error("Error updating alamat:", error);
    return res.status(500).json({ message: "Error updating alamat", error: error.message });
  }
}

export const updateNoHp = async (req, res) => {
  const { no_hp } = req.body;
  await db.query("UPDATE users SET no_hp = ? WHERE id = ?", [no_hp, req.user.id]);
  res.json({ message: "No HP updated" });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Harap isi password lama dan baru.' });
  }

  try {
    console.log("User ID dari token:", id);

    const [userResult] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    const user = userResult[0];
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password lama salah.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [updateResult] = await db.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(500).json({ message: 'Gagal mengubah password.' });
    }

    res.status(200).json({ message: 'Password berhasil diperbarui.' });
  } catch (err) {
    console.error('Error update password:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server.', error: err.message });
  }
};

