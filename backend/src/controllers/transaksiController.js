import db from "../config/database.js";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// GET Snap Token (tanpa insert DB)
export const getSnapToken = async (req, res) => {
  try {
    const { produk_list } = req.body;

    if (!produk_list || produk_list.length === 0) {
      return res.status(400).json({ message: "Daftar produk kosong" });
    }

    const total = produk_list.reduce(
      (acc, item) => acc + item.harga_satuan * item.quantity,
      0
    );

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY, // tidak wajib, hanya untuk frontend
    });

    const parameter = {
      transaction_details: {
        order_id: "TRX-" + Date.now(),
        gross_amount: total,
      },
      customer_details: {
        first_name: req.user.nama || "Pembeli",
        email: req.user.email || "default@email.com",
      },
    };

    const snapResponse = await snap.createTransaction(parameter);

    res.json({ snapToken: snapResponse.token });
  } catch (err) {
    console.error("Gagal membuat Snap Token:", err);
    res.status(500).json({ message: "Gagal membuat Snap Token" });
  }
};

export const konfirmasiTransaksi = async (req, res) => {
  try {
    const { produk_list, order_id, payment_type, total } = req.body;

    if (!produk_list || !order_id || !total) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    // Ambil toko_id dari produk pertama
    const firstProductId = produk_list[0].id;
    const [produkResult] = await db.query(
      `SELECT toko_id FROM produks WHERE id = ?`,
      [firstProductId]
    );

    if (produkResult.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const toko_id = produkResult[0].toko_id;

    // Simpan transaksi dengan toko_id
    const [result] = await db.query(
      `INSERT INTO transaksis 
        (kode_transaksi, pembeli_id, toko_id, payment_method, total, status, tanggal_bayar, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
      [order_id, req.user.id, toko_id, payment_type, total, "Paid"]
    );

    const transaksi_id = result.insertId;

    // Simpan detail produk dalam transaksi
    for (let item of produk_list) {
      const sub_total = item.harga_satuan * item.quantity;

      await db.query(
        `INSERT INTO detail_transaksis 
          (transaksi_id, produk_id, quantity, harga_satuan, sub_total, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [transaksi_id, item.id, item.quantity, item.harga_satuan, sub_total]
      );
    }

    res.json({ message: "Transaksi berhasil disimpan", transaksi_id });
  } catch (error) {
    console.error("Gagal konfirmasi transaksi:", error);
    res.status(500).json({ message: "Gagal konfirmasi transaksi" });
  }
};

export const getTransactionByKode = async (req, res) => {
  const { kode_transaksi } = req.params;

  try {
    // Ambil data transaksi berdasarkan kode_transaksi
    const [transaksiRows] = await db.query(
      `SELECT * FROM transaksis WHERE kode_transaksi = ? AND pembeli_id = ?`,
      [kode_transaksi, req.user.id]
    );

    if (transaksiRows.length === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    const transaksi = transaksiRows[0];

    // Ambil detail produk dalam transaksi
    const [detailRows] = await db.query(
      `SELECT dt.*, p.nama AS nama_produk, p.gambar_produk 
       FROM detail_transaksis dt
       JOIN produks p ON dt.produk_id = p.id
       WHERE dt.transaksi_id = ?`,
      [transaksi.id]
    );

    res.json({
      transaksi,
      detail_transaksi: detailRows,
    });
  } catch (error) {
    console.error("Gagal mengambil data transaksi:", error);
    res
      .status(500)
      .json({
        message: "Gagal mengambil data transaksi",
        error: error.message,
      });
  }
};

export const getMyTransaksiPembeli = async (req, res) => {
  const [transaksis] = await db.query(
    "SELECT t.*, tk.nama AS nama_toko FROM transaksis t JOIN tokos tk ON t.toko_id = tk.id WHERE t.pembeli_id = ? ORDER BY t.created_at DESC",
    [req.user.id]
  );

  for (let transaksi of transaksis) {
    const [details] = await db.query(
      "SELECT dt.*, p.nama AS nama_produk FROM detail_transaksis dt JOIN produk p ON dt.produk_id = p.id WHERE dt.transaksi_id = ?",
      [transaksi.id]
    );
    transaksi.produk_list = details;
  }

  res.json(transaksis);
};

// Penjual: See all transactions for their toko
export const getMyTokoTransaksi = async (req, res) => {
  const [toko] = await db.query("SELECT id FROM tokos WHERE owner_id = ?", [
    req.user.id,
  ]);
  if (!toko.length) return res.status(404).json({ message: "Toko not found" });

  const [transaksis] = await db.query(
    `
    SELECT * FROM transaksis WHERE toko_id = ? ORDER BY created_at DESC
  `,
    [toko[0].id]
  );

  for (let transaksi of transaksis) {
    const [details] = await db.query(
      `
      SELECT dt.*, p.nama AS nama_produk
      FROM detail_transaksis dt
      JOIN produks p ON dt.produk_id = p.id
      WHERE dt.transaksi_id = ?
    `,
      [transaksi.id]
    );

    transaksi.produk_list = details;
  }

  res.json(transaksis);
};

export const getInvoiceById = async (req, res) => {
  const { id } = req.params;

  const [transaksiRows] = await db.query(
    `SELECT t.*, tk.nama AS nama_toko 
     FROM transaksis t 
     JOIN tokos tk ON t.toko_id = tk.id 
     WHERE t.kode_transaksi = ? AND t.pembeli_id = ?`,
    [id, req.user.id]
  );

  if (transaksiRows.length === 0) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  const transaksi = transaksiRows[0];

  const [details] = await db.query(
    `SELECT dt.*, p.nama AS nama_produk, p.gambar_produk 
       FROM detail_transaksis dt
       JOIN produks p ON dt.produk_id = p.id
       WHERE dt.transaksi_id = ?`,
    [transaksi.id]
  );

  res.json({
    transaksi,
    produk_list: details,
    grand_total: details.reduce(
      (acc, cur) => acc + parseFloat(cur.sub_total),
      0
    ),
  });
};

// GET /api/invoices
export const getInvoicesForUser = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         t.kode_transaksi AS id,
         t.tanggal_bayar AS date,
         tk.nama AS namaToko,
         t.status,
         GROUP_CONCAT(CONCAT(p.nama, ':', dt.quantity, ':', dt.sub_total) SEPARATOR '|') AS produk_list
       FROM transaksis t
       JOIN tokos tk ON t.toko_id = tk.id
       JOIN detail_transaksis dt ON t.id = dt.transaksi_id
       JOIN produks p ON dt.produk_id = p.id
       WHERE t.pembeli_id = ?
       GROUP BY t.id
       ORDER BY t.tanggal_bayar DESC`,
      [req.user.id]
    );

    // Format ulang hasil query ke bentuk JSON yang bersih
    const result = rows.map((row) => ({
      id: row.id,
      date: row.date,
      namaToko: row.namaToko,
      status: row.status,
      produk_list: row.produk_list
        ? row.produk_list.split("|").map((item) => {
            const [nama_produk, quantity, sub_total] = item.split(":");
            return {
              nama_produk,
              quantity: parseInt(quantity),
              sub_total: parseInt(sub_total),
            };
          })
        : [],
    }));

    res.json(result);
  } catch (err) {
    console.error("Gagal ambil invoice:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAnalytics = async (req, res) => {
  const [byStatus] = await db.query(`
    SELECT status, COUNT(*) as total FROM transaksis GROUP BY status
  `);

  const [totalRevenue] = await db.query(`
    SELECT SUM(total) AS total_pendapatan FROM transaksis WHERE status = 'selesai'
  `);

  const [topProducts] = await db.query(`
    SELECT p.nama, SUM(dt.quantity) as total_terjual
    FROM detail_transaksis dt
    JOIN produks p ON dt.produk_id = p.id
    GROUP BY dt.produk_id
    ORDER BY total_terjual DESC
    LIMIT 5
  `);

  res.json({
    byStatus,
    totalRevenue: totalRevenue[0]?.total_pendapatan || 0,
    topProducts,
  });
};

// Penjual: Update status from PAID to PROSES
export const updateStatusByPenjual = async (req, res) => {
  const { id } = req.params;

  const [transaksi] = await db.query("SELECT * FROM transaksis WHERE id = ?", [
    id,
  ]);
  if (!transaksi.length)
    return res.status(404).json({ message: "Transaksi not found" });
  if (transaksi[0].status !== "Paid")
    return res.status(400).json({ message: "Status must be 'Paid'" });

  await db.query("UPDATE transaksis SET status = 'Proses' WHERE id = ?", [id]);
  res.json({ message: "Status updated to PROSES" });
};

// Pembeli: Update status from DIKIRIM to DITERIMA
export const updateStatusByPembeli = async (req, res) => {
  const { id } = req.params;

  const [transaksi] = await db.query(
    "SELECT * FROM transaksis WHERE id = ? AND pembeli_id = ?",
    [id, req.user.id]
  );
  if (!transaksi.length)
    return res
      .status(404)
      .json({ message: "Transaksi not found or unauthorized" });
  if (transaksi[0].status !== "Dikirim")
    return res.status(400).json({ message: "Status must be 'dikirim'" });

  await db.query("UPDATE transaksis SET status = 'Diterima' WHERE id = ?", [
    id,
  ]);
  res.json({ message: "Status updated to DITERIMA" });
};

export const updateTransaksiStatus = async (req, res) => {
  const { id } = req.params; // kode_transaksi
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Paid",
    "Proses",
    "Dikirim",
    "Diterima",
    "Selesai",
  ];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  try {
    const [result] = await db.query(
      "UPDATE transaksis SET status = ? WHERE kode_transaksi = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.json({ message: "Status transaksi berhasil diperbarui" });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Gagal memperbarui status" });
  }
};
