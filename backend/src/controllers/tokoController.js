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
    const { nama, no_hp, deskripsi, alamat, email } = req.body || {};

    if (!nama || !no_hp || !deskripsi || !alamat || !email) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Ambil logo lama jika tidak upload baru
    const [[toko]] = await db.query("SELECT logo_toko FROM tokos WHERE owner_id = ?", [req.user.id]);
    const logo_toko = req.file ? req.file.filename : toko.logo_toko;

    // Update ke tabel tokos
    await db.query(
      "UPDATE tokos SET nama=?, no_hp=?, deskripsi=?, alamat=?, email=?, logo_toko=? WHERE owner_id=?",
      [nama, no_hp, deskripsi, alamat, email, logo_toko, req.user.id]
    );

    // ✅ Update juga ke tabel users
    await db.query(
      "UPDATE users SET nama=?, no_hp=?, alamat=?, email=?, foto_profile=? WHERE id=?",
      [nama, no_hp, alamat, email, logo_toko, req.user.id]
    );

    console.log("req.user.id:", req.user.id);

    res.json({ message: "Toko & user profile updated", logo_toko });
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

export const getTokoDashboard = async (req, res) => {
  try {
    // Ambil toko berdasarkan owner
    const [[toko]] = await db.query(
      "SELECT id FROM tokos WHERE owner_id = ?",
      [req.user.id]
    );

    if (!toko) {
      return res.status(404).json({ message: "Toko tidak ditemukan" });
    }

    const tokoId = toko.id;

    // Total produk
    const [[produk]] = await db.query(
      "SELECT COUNT(*) AS total_produk FROM produks WHERE toko_id = ?",
      [tokoId]
    );

    // Total penjualan (jumlah transaksi)
    const [[penjualan]] = await db.query(
      "SELECT COUNT(DISTINCT id) AS total_penjualan FROM transaksis WHERE toko_id = ?",
      [tokoId]
    );

    // Jumlah pembeli unik
    const [[pembeli]] = await db.query(
      "SELECT COUNT(DISTINCT pembeli_id) AS jumlah_pembeli FROM transaksis WHERE toko_id = ?",
      [tokoId]
    );

    // Total pendapatan
    const [[pendapatan]] = await db.query(
      "SELECT COALESCE(SUM(total), 0) AS total_pendapatan FROM transaksis WHERE toko_id = ? AND status IN ('paid', 'proses', 'dikirim', 'diterima', 'selesai')",
      [tokoId]
    );

    res.json({
      total_produk: produk.total_produk,
      total_penjualan: penjualan.total_penjualan,
      jumlah_pembeli: pembeli.jumlah_pembeli,
      total_pendapatan: pendapatan.total_pendapatan,
    });

    console.log(toko);
  } catch (error) {
    console.error("Gagal ambil dashboard:", error);
    res.status(500).json({ message: "Gagal mengambil data dashboard" });
  }
};
