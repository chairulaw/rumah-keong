import React from "react";

const dummyBuyers = [
  {
    id: 1,
    name: "Andi Saputra",
    email: "andi.saputra@gmail.com",
    phone: "081234567890",
    NamaBarang: "Bonsai Sakura Jepang",
    totalOrders: 5,
    totalSpent: "Rp 3.500.000",
    lastOrder: "2025-07-10",
  },
  {
    id: 2,
    name: "Siti Rahma",
    email: "siti.rahma@yahoo.com",
    phone: "082298765432",
    NamaBarang: "Bonsai Sakura Jepang",
    totalOrders: 2,
    totalSpent: "Rp 475.000",
    lastOrder: "2025-07-12",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.santoso@mail.com",
    phone: "089912345678",
    NamaBarang: "Bonsai Sakura Jepang",
    totalOrders: 7,
    totalSpent: "Rp 6.200.000",
    lastOrder: "2025-07-13",
  },
];

const BuyerData = () => {
  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          👥 Data Pembeli
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-pink-500 to-red-400 text-white text-left text-sm uppercase">
                <th className="px-4 py-3 rounded-tl-lg">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Total Order</th>
                <th className="px-4 py-3">Nama Barang</th>
                <th className="px-4 py-3">Total Belanja</th>
                <th className="px-4 py-3 rounded-tr-lg">Transaksi Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {dummyBuyers.map((buyer) => (
                <tr
                  key={buyer.id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-4 py-3 font-medium">{buyer.name}</td>
                  <td className="px-4 py-3">{buyer.email}</td>
                  <td className="px-4 py-3">{buyer.phone}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {buyer.totalOrders} Pesanan
                    </span>
                  </td>
                  <td className="px-4 py-3">{buyer.NamaBarang}</td>
                  <td className="px-4 py-3 font-semibold">{buyer.totalSpent}</td>
                  <td className="px-4 py-3 text-gray-500">{buyer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerData;
