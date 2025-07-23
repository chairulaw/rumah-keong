import db from "../config/database.js";

export const getAdminStats = async (req, res) => {
  try {
    // Ambil semua pengguna
    const [users] = await db.query("SELECT role FROM users");

    const totalUsers = users.length;
    const totalSellers = users.filter(
      (u) => u.role?.toLowerCase().trim() === "penjual"
    ).length;
    const totalBuyers = users.filter(
      (u) => u.role?.toLowerCase().trim() === "pembeli"
    ).length;

    // Ambil semua transaksi
    const [transactions] = await db.query("SELECT total FROM transaksis");
    const totalTransactions = transactions.length;

    // Ambil total pendapatan (SUM)
    const [totalRevenueResult] = await db.query(
      "SELECT SUM(total) AS total FROM transaksis WHERE status IN ('paid', 'proses', 'dikirim', 'diterima', 'selesai')"
    );

    const totalRevenue = totalRevenueResult[0].total || 0;

    res.json({
      totalUsers,
      totalSellers,
      totalBuyers,
      totalTransactions,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Gagal mengambil statistik" });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT t.id, u.nama AS user, t.total, t.status, DATE(t.created_at) AS tanggal
      FROM transaksis t
      JOIN users u ON t.pembeli_id = u.id
      ORDER BY t.created_at DESC
    `);

    res.json(results);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Gagal mengambil data transaksi" });
  }
};
