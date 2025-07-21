import React, { useEffect, useState } from "react";

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

const ManageSales = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/toko/my-sales", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setSales(data);
    } catch (error) {
      console.error("Gagal mengambil data penjualan:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:3000/api/transaksi/status/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify({ status: newStatus }),
});


      const updatedSales = sales.map((sale) =>
        sale.id === id ? { ...sale, status: newStatus } : sale
      );
      setSales(updatedSales);
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
    }
  };

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          📈 Riwayat Penjualan
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-left text-sm uppercase">
                <th className="px-4 py-3 rounded-tl-lg">Invoice</th>
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Tanggal</th>
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
                  <td className="px-4 py-3">{sale.buyer}</td>
                  <td className="px-4 py-3">{sale.product}</td>
                  <td className="px-4 py-3">{sale.date}</td>
                  <td className="px-4 py-3">
                    {Number(sale.total).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={sale.status}
                      onChange={(e) =>
                        handleStatusChange(sale.id, e.target.value)
                      }
                      className={`text-white text-xs font-medium px-3 py-1 rounded focus:outline-none ${
                        statusColors[sale.status] || "bg-gray-300"
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    Belum ada transaksi penjualan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSales;
