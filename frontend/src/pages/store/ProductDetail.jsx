import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/produk/${id}`);
        const data = await res.json();
        if (typeof data.gambar_produk === "string") {
          data.gambar_produk = JSON.parse(data.gambar_produk);
        }
        setProduct(data);
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Back Button */}
        <div className="mb-10">
          <Link
            to={`/detail-store/${product.toko_id}`}
            className="inline-flex items-center text-gray-500 hover:text-black transition duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Store</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Galeri Gambar */}
          <div className="grid grid-cols-2 gap-4">
            {product.gambar_produk.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000/uploads/${img}`}
                alt={`${product.nama} ${idx + 1}`}
                className="w-full h-[300px] md:h-[380px] object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Informasi Produk */}
          <div className="space-y-6">
            <h1 className="text-4xl font-light tracking-tight">{product.nama}</h1>
            <p className="text-2xl font-medium text-green-800">
              IDR {parseInt(product.harga).toLocaleString("id-ID")}
            </p>

            <p className="text-sm text-gray-500">Stok: {product.stok || "Tersedia"}</p>

            <div className="border-t border-gray-300 pt-6 space-y-4">
              <h2 className="text-lg font-semibold">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.deskripsi}</p>

              <div className="pt-4 space-y-1">
                <h3 className="font-medium">Kategori:</h3>
                <p className="text-gray-500">{product.kategori || "Hiasan atau Aksesoris"}</p>

                <h3 className="font-medium mt-4">Size & Dimension:</h3>
                <p className="text-gray-500">Pot Diameter: 14cm • Tinggi ±30cm</p>

                <h3 className="font-medium mt-4">Perawatan:</h3>
                <p className="text-gray-500">Cukup dibersihkan jika sudah mulai kotor.</p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-20 border border-gray-300 rounded-md p-2 text-center"
                />
              </div>

              <button className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Informasi Tambahan */}
        <div className="mt-20 grid md:grid-cols-3 gap-12 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-black mb-2">Pengiriman</h4>
            <p>Untuk saat ini hanya mengandalkan pengiriman via kurir lokal.</p>
          </div>
          <div>
            <h4 className="font-medium text-black mb-2">Perawatan</h4>
            <p>Instruksi perawatan tanaman akan disertakan dalam paket pembelian.</p>
          </div>
          <div>
            <h4 className="font-medium text-black mb-2">Garansi</h4>
            <p>Klaim garansi 1x24 jam setelah produk diterima jika tanaman rusak atau layu saat pengiriman.</p>
          </div>
        </div>

        {/* Related Produk */}
        <div className="mt-28">
          <h2 className="text-2xl font-semibold mb-6">You may also like</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 hover:shadow-lg">
                <img
                  src={`http://localhost:3000/uploads/${product.gambar_produk[0]}`}
                  alt={`related-${i}`}
                  className="h-52 w-full object-cover rounded mb-4"
                />
                <p className="text-lg">{product.nama}</p>
                <p className="text-gray-500 text-sm">
                  IDR {parseInt(product.harga).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
