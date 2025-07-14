import React, { useState } from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Bonsai Sakura Jepang",
    price: "Rp 1.250.000",
    stock: 12,
    category: "Tanaman",
  },
  {
    id: 2,
    name: "Mini Kaktus Hias",
    price: "Rp 75.000",
    stock: 58,
    category: "Dekorasi",
  },
  {
    id: 3,
    name: "Pot Gantung Estetik",
    price: "Rp 120.000",
    stock: 20,
    category: "Aksesoris",
  },
];

const ManageProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  });

  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      images: Array.from(e.target.files),
    });
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produk Baru:", newProduct);
    setIsOpen(false);
    setNewProduct({ name: "", description: "", price: "", stock: "", images: [] });
  };

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🪴 Produk Saya</h2>
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
                <th className="px-4 py-3 rounded-tl-lg">#</th>
                <th className="px-4 py-3">Nama Produk</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3 rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">
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
                    placeholder="Harga Produk (Rp)"
                    className="w-1/2 border border-gray-300 rounded px-4 py-2"
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

              {/* Tombol Close (X) */}
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
