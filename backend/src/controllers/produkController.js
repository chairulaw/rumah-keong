import db from "../config/database.js";

export const getProdukByToko = async (req, res) => {
    const [toko] = await db.query("SELECT id FROM tokos WHERE owner_id = ?", [req.user.id]);
    if(!toko.lenght) return res.status(404).json({message: "Toko not found"});

    const [produk] = await db.query("SELECT * FROM produk WHERE toko_id = ?", [toko[0].id]);
    res.json(produk);
}

export const createProduk = async (req, res) => {
    const [toko] = await db.query("SELECT id FROM tokos WHERE owner_id = ?", [req.user.id]);
    if(!toko.lenght) return res.status(404).json({message: "Toko not found"});

    const { nama, deskripsi, gambar, harga, stok } = req.body;
    await db.query("INSER INTO produks (toko_id, nama, deskripsi, gambar, harga, stok) VALUES (?, ?, ?, ?, ?, ?)", [toko[0].id, nama, deskripsi, gambar, harga, stok]);
    res.status({message: "Produk created"});
}

export const updateProduk = async (req, res) => {
    const {id} = req.params;
    const {nama, deskripsi, gambar, harga, stok} = req.body;

    await db.query("UPDATE produk SET nama=?, deskripsi=?, gambar=?, harga=?, stok=? WHERE id=?", [nama, deskripsi, gambar, harga, stok, id]);
    res.json({message: "Produk updated"});
}

export const deleteProduk = async (req, res) => {
    const {id} = req.params;
    await db.query("DELETE FROM produk WHERE id=?", [id]);
    res.json({message: "Produk deleted"});
}