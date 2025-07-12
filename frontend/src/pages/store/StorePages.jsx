import React from "react";
import { heroImg } from "../../assets/assets";
import { Link } from "react-router-dom";

const stores = [
  {
    id: 1,
    name: "Keong Garden",
    description: "Spesialis tanaman hias & bonsai langka.",
    image: heroImg,
    isOpen: true,
  },
  {
    id: 2,
    name: "Rimba Tropis",
    description: "Menjual bibit dan tanaman tropis lokal.",
    image: heroImg,
    isOpen: false,
  },
  {
    id: 3,
    name: "Flora House",
    description: "Toko tanaman rumah minimalis & dekorasi hijau.",
    image: heroImg,
    isOpen: true,
  },
];

const Store = () => {
  return (
    <div className="bg-[#f9f6f1] min-h-screen px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1c1c1c] mb-10 text-center">
          Toko yang Tersedia
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative group"
            >
              {!store.isOpen && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm z-10">
                  TUTUP
                </div>
              )}
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-[250px] object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold text-[#1c1c1c] mb-1 text-center">
                {store.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4 text-center">{store.description}</p>
              <div className="mt-auto">
                <Link
                  to={`/store/${store.id}`}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition duration-200 ${
                    store.isOpen
                      ? "bg-[#1c1c1c] text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {store.isOpen ? "Lihat Toko" : "Toko Tutup"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
