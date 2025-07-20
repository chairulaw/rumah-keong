import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StorePages = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/toko");
        if (!res.ok) throw new Error("Gagal mengambil data toko");
        const data = await res.json();
        setStores(data);
      } catch (err) {
        console.error("Gagal memuat toko:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="bg-[#f9f6f1] min-h-screen px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1c1c1c] mb-10 text-center">
          Toko yang Tersedia
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data toko...</p>
        ) : stores.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada toko tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center group"
              >
                <img
                  src={
                    store.logo_toko
                      ? `http://localhost:3000/uploads/${store.logo_toko}`
                      : "/default-store.jpg"
                  }
                  alt={store.nama}
                  className="w-full h-[250px] object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold text-[#1c1c1c] mb-1 text-center">
                  {store.nama}
                </h2>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {store.deskripsi || "Toko ini belum memiliki deskripsi."}
                </p>
                <Link
                  to={`/detail-store/${store.id}`}
                  className="px-5 py-2 rounded-full text-sm font-medium bg-[#1c1c1c] text-white hover:bg-gray-800 transition duration-200"
                >
                  Lihat Toko
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePages;
