import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { heroImg } from "../../assets/Assets";
import { MdOutlineArrowOutward } from "react-icons/md";

// Dummy data toko
const stores = [
  {
    id: 1,
    name: "Keong Garden",
    description: "Spesialis tanaman hias & bonsai langka.",
    image: heroImg,
  },
  {
    id: 2,
    name: "Rimba Tropis",
    description: "Menjual bibit dan tanaman tropis lokal.",
    image: heroImg,
  },
  {
    id: 3,
    name: "Flora House",
    description: "Toko tanaman rumah minimalis & dekorasi hijau.",
    image: heroImg,
  },
];

// Dummy produk per toko
const products = [
  {
    id: 101,
    storeId: 1,
    name: "Cascading Hawthorn Bonsai",
    price: "IDR 1,500,000",
    image: heroImg,
    soldOut: false,
    path: "/detail-product/101",
  },
  {
    id: 102,
    storeId: 1,
    name: "Mini Maple Bonsai",
    price: "IDR 1,500,000",
    image: heroImg,
    soldOut: true,
    path: "/detail-product/101",
  },
  {
    id: 103,
    storeId: 2,
    name: "Pohon Pisang Hias",
    price: "IDR 1,500,000",
    image: heroImg,
    soldOut: false,
    path: "/detail-product/101",
  },
];

const DetailStore = () => {
  const { id } = useParams();
  const storeId = parseInt(id);
  const store = stores.find((s) => s.id === storeId);
  const storeProducts = products.filter((p) => p.storeId === storeId);

  if (!store) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-xl font-semibold">Toko tidak ditemukan.</h2>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-[#f9f6f1] min-h-screen px-6 md:px-12 lg:px-20 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="group inline-block mb-8"
        >
          <Link
            to="/store-pages"
            className="relative inline-flex items-center text-gray-500 group-hover:text-black transition-colors 
        after:content-[' '] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] 
        after:bg-black after:transition-all after:duration-300 group-hover:after:w-full font-semibold"
          >
            <span>&larr;</span>
            <span className="ml-2">Back</span>
          </Link>
        </motion.div>

        {/* Profil Toko */}
        <div className="bg-white rounded-xl shadow p-6 md:flex gap-6 items-center mb-10">
          <img
            src={store.image}
            alt={store.name}
            className="w-full md:w-1/3 h-[250px] object-cover rounded-lg"
          />
          <div className="mt-6 md:mt-0 md:flex-1">
            <h1 className="text-3xl font-bold text-[#1c1c1c] mb-2">
              {store.name}
            </h1>
            <p className="text-gray-600 text-sm mb-4">{store.description}</p>
            <span
              className={`inline-block px-4 py-1 text-xs font-medium rounded-full ${
                store.isOpen
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {store.isOpen ? "Buka" : "Tutup"}
            </span>
          </div>
        </div>

        {/* Produk Toko */}
        <h2 className="text-2xl font-semibold text-[#1c1c1c] mb-6">
          Produk dari Toko Ini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storeProducts.length > 0 ? (
            storeProducts.map((product) => (
              <Link
                to={`/detail-product/${product.id}`}
                key={product.id}
                className="bg-white rounded-xl shadow p-5 flex flex-col items-center relative group hover:shadow-lg hover:bg-gray-50 transition-shadow duration-200"
              >
                {product.soldOut && (
                  <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-sm z-10">
                    SOLD OUT
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[250px] object-contain mb-4 rounded"
                />
                <h3 className="text-lg font-medium text-[#1c1c1c] text-center mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{product.price}</p>
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
