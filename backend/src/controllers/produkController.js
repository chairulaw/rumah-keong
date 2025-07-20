import db from "../config/database.js";

export const getProdukByToko = async (req, res) => {
  const [toko] = await db.query("SELECT id FROM tokos WHERE owner_id = ?", [
    req.user.id,
  ]);
  if (!toko.length)
    return res.status(424).json({ message: "Toko not found " + req.user.id });

  const [produk] = await db.query("SELECT * FROM produks WHERE toko_id = ?", [
    toko[0].id,
  ]);

  // ✅ Convert gambar_produk dari string JSON ke array
  const parsedProduk = produk.map((item) => ({
    ...item,
    gambar_produk: JSON.parse(item.gambar_produk),
  }));

  res.json(parsedProduk);
};

export const getProdukByTokoId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM produks WHERE toko_id = ?", [id]);

    // ✅ Parse gambar_produk
    const parsedProduk = rows.map((item) => ({
      ...item,
      gambar_produk: JSON.parse(item.gambar_produk),
    }));

    res.json(parsedProduk);
  } catch (error) {
    console.error("Gagal mengambil produk berdasarkan toko:", error);
    res.status(500).json({ message: "Gagal mengambil produk toko" });
  }
};

export const getProdukById = async (req, res) => {
  const produkId = req.params.id;
  try {
    const [result] = await db.execute("SELECT * FROM produks WHERE id = ?", [produkId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const produk = result[0];

    // Parse gambar_produk jika berupa JSON string
    if (typeof produk.gambar_produk === "string") {
      produk.gambar_produk = JSON.parse(produk.gambar_produk);
    }

    // Tambahkan planter dummy jika perlu (karena tidak ada di DB)
    produk.planters = ["Speckled Cream", "Charcoal Speckled", "Orb"];

    res.json(produk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil detail produk" });
  }
};


export const createProduk = async (req, res) => {
  const [toko] = await db.query("SELECT id FROM tokos WHERE owner_id = ?", [
    req.user.id,
  ]);
  if (!toko.length)
    return res.status(404).json({ message: "Toko not found" });

  const { nama, deskripsi, harga, stok } = req.body;

  if (!nama || !deskripsi || !harga || !stok) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  const hargaNumber = parseInt(harga.toString().replace(/\D/g, ""), 10);
  const gambarProduk = req.files?.map((file) => file.filename) || [];
  const gambarProdukString = JSON.stringify(gambarProduk);

  await db.query(
    "INSERT INTO produks (toko_id, nama, deskripsi, gambar_produk, harga, stok) VALUES (?, ?, ?, ?, ?, ?)",
    [toko[0].id, nama, deskripsi, gambarProdukString, hargaNumber, stok]
  );

  res.status(201).json({ message: "Produk created" });
};



export const updateProduk = async (req, res) => {
    const {id} = req.params;
    const {nama, deskripsi, gambar, harga, stok} = req.body;

    await db.query("UPDATE produks SET nama=?, deskripsi=?, gambar_produk=?, harga=?, stok=? WHERE id=?", [nama, deskripsi, gambar, harga, stok, id]);
    res.json({message: "Produk updated"});
}

export const deleteProduk = async (req, res) => {
    const {id} = req.params;
    await db.query("DELETE FROM produks WHERE id=?", [id]);
    res.json({message: "Produk deleted"});
}