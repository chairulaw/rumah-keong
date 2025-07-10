import bcrypt from "bcryptjs";
import db from "../config/database.js";
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


export const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Uploaded file:', req.file);

  
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path); 
      return res.status(400).json({ message: 'Invalid file type. Only image files are allowed.' });
    }

    const fileName = req.file.filename;
    const profileImagePath = path.join('uploads', fileName); 

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is missing or invalid' });
    }

   
    const result = await query('UPDATE users SET foto_profile = ? WHERE id = ?', [profileImagePath, req.user.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      profileImage: profileImagePath,
    });

  } catch (error) {
    console.error('Error uploading image:', error);  
    res.status(500).json({ message: 'Error uploading profile image', error: error.message });
  }
};

