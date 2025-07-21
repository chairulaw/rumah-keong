import db from "../config/database.js";

export const getAllToko = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tokos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil toko' });
  }
};

export const getTokoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM tokos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Toko tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil detail toko' });
  }
}

export const getMyToko = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tokos WHERE owner_id = ?", [req.user.id]);
  res.json(rows[0] || {});
};

export const updateToko = async (req, res) => {
  try {
    // Pastikan req.body tidak undefined
    const { nama, alamat, deskripsi, no_hp, email } = req.body || {};

    if (!nama || !alamat || !deskripsi || !no_hp || !email) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Ambil logo lama jika tidak ada file baru
    const [[toko]] = await db.query("SELECT logo_toko FROM tokos WHERE owner_id = ?", [req.user.id]);
    const logo_toko = req.file ? req.file.filename : null;
    const finalLogo = logo_toko || toko.logo_toko;

    await db.query(
      "UPDATE tokos SET nama=?, alamat=?, deskripsi=?, no_hp=?, email=?, logo_toko=? WHERE owner_id=?",
      [nama, alamat, deskripsi, no_hp, email, finalLogo, req.user.id]
    );

    res.json({ message: "Toko updated", logo_toko: finalLogo });
  } catch (error) {
    console.error("Update toko error:", error);
    res.status(500).json({ message: "Gagal update toko" });
  }
};

export const getSalesByTokoId = async (req, res) => {
  try {
    // Ambil toko berdasarkan owner_id
    const [[toko]] = await db.query(
      "SELECT id FROM tokos WHERE owner_id = ?",
      [req.user.id]
    );

    if (!toko) {
      return res.status(404).json({ message: "Toko tidak ditemukan" });
    }

    const [rows] = await db.query(
      `SELECT 
         t.kode_transaksi AS id,
         u.nama AS buyer,
         p.nama AS product,
         DATE(t.tanggal_bayar) AS date,
         dt.sub_total AS total,
         t.status
       FROM transaksis t
       JOIN users u ON t.pembeli_id = u.id
       JOIN detail_transaksis dt ON dt.transaksi_id = t.id
       JOIN produks p ON dt.produk_id = p.id
       WHERE t.toko_id = ?
       ORDER BY t.tanggal_bayar DESC`,
      [toko.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Gagal mengambil data penjualan:", error);
    res.status(500).json({ message: "Gagal mengambil penjualan" });
  }
};

