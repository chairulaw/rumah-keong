import React, { useState } from "react";

const initialSales = [
  {
    id: "INV001",
    namaToko: "Andi Saputra",
    product: "Bonsai Sakura Jepang",
    date: "2025-07-10",
    quantity: 1,
    price: "Rp 1.250.000",
    total: "Rp 1.250.000",
    status: "selesai",
  },
  {
    id: "INV002",
    namaToko: "Siti Rahma",
    product: "Mini Kaktus Hias",
    date: "2025-07-12",
    quantity: 1,
    price: "Rp 1.250.000",
    total: "Rp 75.000",
    status: "proses",
  },
  {
    id: "INV003",
    namaToko: "Budi Santoso",
    product: "Pot Gantung Estetik",
    date: "2025-07-13",
    quantity: 1,
    price: "Rp 1.250.000",
    total: "Rp 120.000",
    status: "dikirim",
  },
];

const statusOptions = [
  "pending",
  "paid",
  "proses",
  "dikirim",
  "diterima",
  "selesai",
];

const statusColors = {
  pending: "bg-gray-400",
  paid: "bg-yellow-500",
  proses: "bg-blue-400",
  dikirim: "bg-indigo-500",
  diterima: "bg-teal-500",
  selesai: "bg-green-500",
};

const CustomerOrders = () => {
  const [sales, setSales] = useState(initialSales);

  const handleStatusChange = (id, newStatus) => {
    const updatedSales = sales.map((sale) =>
      sale.id === id ? { ...sale, status: newStatus } : sale
    );
    setSales(updatedSales);
  };

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🛍️ Pesanan Saya
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-left text-sm uppercase">
                <th className="px-4 py-3 rounded-tl-lg">Invoice</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Nama Toko</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-4 py-3 font-medium">{sale.id}</td>
                  <td className="px-4 py-3">{sale.date}</td>
                  <td className="px-4 py-3">{sale.namaToko}</td>
                  <td className="px-4 py-3">{sale.product}</td>
                  <td className="px-4 py-3">{sale.quantity}</td>
                  <td className="px-4 py-3">{sale.price}</td>
                  <td className="px-4 py-3">{sale.total}</td>
                  <td className="px-4 py-3">
                    {/* <select
                      value={sale.status}
                      onChange={(e) =>
                        handleStatusChange(sale.id, e.target.value)
                      }
                      className={`text-white text-xs font-medium px-3 py-1 rounded focus:outline-none ${
                        statusColors[sale.status]
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
