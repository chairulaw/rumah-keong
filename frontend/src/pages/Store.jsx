import React from "react";
import { heroImg } from "../assets/assets";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Cascading Hawthorn Bonsai (Japan)",
    price: "SGD 108.00",
    image: heroImg,
    soldOut: false,
  },
  {
    id: 2,
    name: "Bending Manuka Myrtle (Japan)",
    price: "SGD 108.00",
    image: heroImg,
    soldOut: true,
  },
  {
    id: 3,
    name: "Isozansho Bonsai",
    price: "SGD 158.00",
    image: heroImg,
    soldOut: false,
  },
];

const Store = () => {
  return (
    <div className="bg-[#f9f6f1] min-h-screen px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1c1c1c] mb-10 text-center">
          Store
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative group"
            >
              {product.soldOut && (
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-sm z-10">
                  SOLD OUT
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-contain mb-4 rounded"
              />
              <h2 className="text-lg font-medium text-[#1c1c1c] mb-2 text-center">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{product.price}</p>
              <div className="mt-auto">
                {product.soldOut ? (
                  <button
                    className="px-6 py-2 border border-gray-400 text-gray-400 rounded-full text-sm cursor-not-allowed"
                    disabled
                  >
                    Sold Out
                  </button>
                ) : (
                  <button className="px-6 py-2 border border-[#1c1c1c] text-[#1c1c1c] rounded-full text-sm hover:bg-[#1c1c1c] hover:text-white transition-colors duration-200">
                    Add to Cart
                  </button>
                )}
              </div>
              <Link
                to={`/product/${product.id}`}
                className="mt-3 text-blue-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;