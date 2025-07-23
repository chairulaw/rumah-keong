import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DetailStore = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const resStore = await fetch(`http://localhost:3000/api/toko/${id}`);
        const storeData = await resStore.json();
        setStore(storeData);

        // Ambil produk dari toko ini (asumsikan kamu punya endpoint ini)
        const resProducts = await fetch(
          `http://localhost:3000/api/produk/toko/${id}`
        );
        const productData = await resProducts.json();
        setProducts(productData);
      } catch (err) {
        console.error("Gagal mengambil data toko atau produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!store)
    return (
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-xl font-semibold">Toko tidak ditemukan.</h2>
      </div>
    );

  return (
    <div className="bg-[#f9f6f1] min-h-screen px-6 md:px-12 lg:px-20 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/store-pages"
            className="text-gray-600 hover:text-black text-sm font-medium"
          >
            &larr; Kembali ke daftar toko
          </Link>
        </div>

        {/* Info Toko */}
        <div className="bg-white rounded-xl shadow p-6 md:flex gap-6 items-center mb-10">
          <img
            src={
              store.logo_toko
                ? `http://localhost:3000/uploads/${store.logo_toko}`
                : "/default-store.jpg"
            }
            alt={store.nama}
            className="w-full md:w-1/3 h-[250px] object-cover rounded-lg"
          />
          <div className="mt-6 md:mt-0 md:flex-1">
            <h1 className="text-3xl font-bold text-[#1c1c1c] mb-2">
              {store.nama}
            </h1>
            <p className="text-gray-600 text-sm mb-4">{store.deskripsi}</p>
            <p className="text-sm text-gray-500">Alamat: {store.alamat}</p>
            <p className="text-sm text-gray-500">No. HP: {store.no_hp}</p>
          </div>
        </div>

        {/* Produk */}
        <h2 className="text-2xl font-semibold text-[#1c1c1c] mb-6">
          Produk dari Toko Ini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/detail-product/${product.id}`}
                key={product.id}
                className="bg-white rounded-xl shadow p-5 flex flex-col items-center hover:bg-gray-50 transition"
              >
                <img
                  src={
                    product.gambar_produk && product.gambar_produk.length > 0
                      ? `http://localhost:3000/uploads/${product.gambar_produk[0]}`
                      : "/default-image.png"
                  }
                  alt={product.nama}
                  className="w-full h-[250px] object-cover mb-4 rounded"
                />

                <h3 className="text-lg font-medium text-[#1c1c1c] text-center mb-1">
                  {product.nama}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Rp {parseInt(product.harga).toLocaleString("id-ID")}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              Belum ada produk di toko ini.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailStore;
