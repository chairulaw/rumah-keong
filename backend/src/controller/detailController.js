import db from "../config/database.js";

export const createDetail = async (req, res) => {
    const { transaksi_id, produk_id, quantity, harga_satuan } = req.body;
    const sub_total = quantity * harga_satuan;

    await db.query("INSERT INTO detail_transaksis (transaksi_id, produk_id, quantity, harga_satuan, sub_total) VALUES (?, ?, ?, ?, ?)", [transaksi_id, produk_id, quantity, harga_satuan, sub_total]);

    res.status(201).json({ message: "Detail created successfully" });
}

export const updateDetail = async (req, res) => {
    const {id} = req.params;
    const {quantity, harga_satuan,} = req.body;
    const sub_total = quantity * harga_satuan;

    await db.query("UPDATE detail_transaksis SET quantity = ?, harga_satuan = ?, sub_total = ? WHERE id = ?", [ quantity, harga_satuan, sub_total, id]);

    res.status(200).json({ message: "Detail updated successfully" });
}

export const deleteDetail = async (req, res) => {
    const {id} = req.params;

    await db.query("DELETE FROM detail_transaksis WHERE id = ?", [id]);

    res.status(200).json({ message: "Detail deleted successfully" });
}