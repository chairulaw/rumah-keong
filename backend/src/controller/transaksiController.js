import db from "../config/database.js";


export const getMyTransaksiPembeli = async (req, res) => {
    const [transaksis] = await db.query("SELECT t.*, tk.nama AS nama_toko FROM transaksis t JOIN tokos tk ON t.toko_id = tk.id WHERE t.pembeli_id = ? ORDER BY t.created_at DESC", [req.user.id]);
    
    for (let transaksi of transaksis) {
        const [details] = await db.query("SELECT dt.*, p.nama AS nama_produk FROM detail_transaksis dt JOIN produk p ON dt.produk_id = p.id WHERE dt.transaksi_id = ?", [transaksi.id]);
        transaksi.produk_list = details;
    }
    
    res.json(transaksis);
};

export const getInvoiceById = async (req, res) => {
    const { id } = req.params;

    const {transaksi} = await db.query(
        "SELECT t.*, tk.nama AS nama_toko FROM transaksis t JOIN tokos tk ON t.toko_id = tk.id WHERE t.id = ? AND t.pembeli_id = ?",
        [id, req.user.id]
    );

    if (!transaksi) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    const [details] =  await db.query(
        "SELECT dt.*, p.nama AS nama_produk FROM detail_transaksis dt JOIN produk p ON dt.produk_id = p.id WHERE dt.transaksi_id = ?",
        [id]
    )

    res.json({
        transaksi: transaksi[0],
        produk_list: details,
        grand_total: details.reduce((acc, cur) => acc + parseFloat(cur.sub_total), 0),
    });
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
