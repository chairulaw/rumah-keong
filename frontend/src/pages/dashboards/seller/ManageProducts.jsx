import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  });

  const token = localStorage.getItem("token");
  const [tokoId, setTokoId] = useState(null);

  // Ambil data toko milik user
  const fetchTokoId = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/toko/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTokoId(res.data.id);
    } catch (err) {
      console.error("Gagal mendapatkan toko", err);
    }
  };

  // Ambil produk milik toko user
  const fetchProducts = async () => {
    if (!tokoId) return;
    try {
      const res = await axios.get(`http://localhost:3000/api/produk/toko/${tokoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Gagal fetch produk", err);
    }
  };

  useEffect(() => {
    fetchTokoId();
  }, []);

  useEffect(() => {
    if (tokoId) {
      fetchProducts();
    }
  }, [tokoId]);

  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      images: Array.from(e.target.files),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const cleaned = value.replace(/[^\d]/g, "");
      setNewProduct({
        ...newProduct,
        price: formatRupiah(cleaned),
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("nama", newProduct.name);
    form.append("deskripsi", newProduct.description);
    form.append("harga", newProduct.price.replace(/\./g, "").replace(/,/g, ""));
    form.append("stok", newProduct.stock);
    for (const img of newProduct.images) {
      form.append("gambarProduk", img); // field name sesuai multer upload.array
    }

    try {
      const res = await fetch("http://localhost:3000/api/produk", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (res.ok) {
        alert("Produk berhasil ditambahkan!");
        setIsOpen(false);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          stock: "",
          images: [],
        });
        fetchProducts(); // Refresh data produk
      } else {
        alert("Gagal tambah produk");
      }
    } catch (err) {
      console.error(err);
      alert("Error saat tambah produk");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      await fetch(`http://localhost:3000/api/produk/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produk dihapus");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk");
    }
  };

  const formatRupiah = (angka) => {
    const numberString = angka.replace(/[^\d]/g, "");
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(numberString));
    return formatted.replace("Rp", "").trim();
  };

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📦 Produk Saya</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
          >
            + Tambah Produk Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-left text-sm uppercase">
                <th className="px-4 py-3 rounded-tl-lg">No</th>
                <th className="px-4 py-3">Gambar Produk</th>
                <th className="px-4 py-3">Nama Produk</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3 rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {product.gambar_produk?.map((filename, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:3000/uploads/${filename}`}
                          alt={`${product.nama}-${idx}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{product.nama}</td>
                  <td className="px-4 py-3">
                    Rp {parseInt(product.harga).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{product.stok}</td>
                  <td className="px-4 py-3">{product.deskripsi}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah Produk */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
              <h3 className="text-xl font-semibold mb-4">Tambah Produk Baru</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  placeholder="Nama Produk"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  placeholder="Deskripsi Produk"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows={3}
                  required
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    placeholder="Harga Produk"
                    className="pl-10 w-full border border-gray-300 rounded px-4 py-2"
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                    placeholder="Stok"
                    className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    required
                  />
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                {newProduct.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProduct.images.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Simpan Produk
                  </button>
                </div>
              </form>

              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
