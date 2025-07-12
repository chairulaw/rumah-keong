import React, { useState } from "react";
import { heroImg } from "../assets/assets";

const ProductDetail = () => {
  const [selectedPlanter, setSelectedPlanter] = useState("");

  const planters = [
    "Speckled Cream",
    "Charcoal Speckled",
    "Orb"
  ];

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white">

      <div className="md:flex space-y-6 md:space-y-0 md:space-x-8">
        {/* Galeri Gambar */}
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <img src={heroImg} alt="Feronialla bonsai 1" className="w-full h-auto object-cover rounded" />
            <img src={heroImg} alt="Feronialla bonsai 2" className="w-full h-auto object-cover rounded" />
            <img src={heroImg} alt="Feronialla bonsai 3" className="w-full h-auto object-cover rounded" />
            <img src={heroImg} alt="Feronialla bonsai 4" className="w-full h-auto object-cover rounded" />
          </div>
        </div>

        {/* Informasi Produk */}
        <div className="md:w-1/2 space-y-4">
      {/* Judul & Harga */}
      <h1 className="text-4xl font-semibold mb-4">Feroniella Bonsai</h1>
      <p className="text-2xl text-green-700 font-bold mb-6">from SGD 148.00</p>
          <p>This plant is grown as bonsai, and requires minimal pruning. A bright environment will be perfect for this centrepiece. Dimensions: Potted Plant: W 9 ‑ 12 cm x H 15‑20 cm Bonsai Planter: ø 9.2 cm x H 9 cm.</p>

          {/* Form pilihan */}
          <div>
            <label className="block font-medium mb-2">Planters:</label>
            <select
              value={selectedPlanter}
              onChange={(e) => setSelectedPlanter(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-2"
            >
              <option value="">Select Planter</option>
              {planters.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label>Quantity:</label>
            <input type="number" defaultValue={1} min={1} className="w-16 border border-gray-300 rounded p-2" />
          </div>

          <button className="mt-4 w-full md:w-auto px-6 py-3  text-black border rounded-full hover:bg-blue-500 hover:text-white transition">
            Add To Cart
          </button>

          {/* Description blok */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <hr className="mb-4" />
            <p>Potted in Soilboy Basic Gritty Mix.</p>
            <p className="mt-2 text-red-600">This plant is mildly toxic for children and pets when ingested.</p>
            <p className="mt-2 text-gray-500 italic">Plant images depicted are solely for illustration purposes only.</p>
          </div>          
        </div>
      </div>

              {/* Recommended Product */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {planters.map((planter, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <img src={heroImg} alt={planter} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-lg font-medium">{planter}</h3>
              <p className="text-gray-600 mt-1">SGD 148.00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default ProductDetail;
