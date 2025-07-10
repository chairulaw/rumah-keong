import db from "../config/database.js";

export const getMyToko = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tokos WHERE owner_id = ?", [req.user.id]);
  res.json(rows[0] || {});
};

export const updateToko = async (req, res) => {
  const { nama, alamat, deskripsi, no_hp, email } = req.body;
  await db.query(
    "UPDATE tokos SET nama=?, alamat=?, deskripsi=?, no_hp=?, email=? WHERE owner_id=?",
    [nama, alamat, deskripsi, no_hp, email, req.user.id]
  );
  res.json({ message: "Toko updated" });
};
