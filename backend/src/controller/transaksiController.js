import db from "../config/database.js";


export const getMyTransaksiPembeli = async (req, res) => {
    const [transaksis] = await db.query("SELECT t.*, tk.nama AS nama_toko FROM transaksis t JOIN tokos tk ON t.toko_id = tk.id WHERE t.pembeli_id = ? ORDER BY t.created_at DESC", [req.user.id]);
    
    for (let transaksi of transaksis) {
        const [details] = await db.query("SELECT dt.*, p.nama AS nama_produk FROM detail_transaksis dt JOIN produk p ON dt.produk_id = p.id WHERE dt.transaksi_id = ?", [transaksi.id]);
        transaksi.produk_list = details;
    }
    
    res.json(transaksis);
};
