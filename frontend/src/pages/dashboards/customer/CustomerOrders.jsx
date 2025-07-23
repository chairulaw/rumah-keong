import React, { useState, useEffect } from "react";

const statusColors = {
  Pending: "bg-gray-400",
  Paid: "bg-green-500",
  Proses: "bg-blue-400",
  Dikirim: "bg-indigo-500",
  Diterima: "bg-teal-500",
  Selesai: "bg-green-500",
};

const CustomerOrders = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/transaksi/pembeli/invoices", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch invoices", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

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
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => {
                const totalQty = sale.produk_list?.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                );
                const totalHarga = sale.produk_list?.reduce(
                  (acc, item) => acc + item.sub_total,
                  0
                );

                return (
                  <tr
                    key={sale.id}
                    className="border-b hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="px-4 py-3 font-medium">{sale.id}</td>
                    <td className="px-4 py-3">{sale.date}</td>
                    <td className="px-4 py-3">{sale.namaToko}</td>
                    <td className="px-4 py-3">
                      {sale.produk_list?.map((item, idx) => (
                        <div key={idx}>{item.nama_produk}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-center">{totalQty}</td>
                    <td className="px-4 py-3">
                      Rp {totalHarga?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-white text-xs font-medium px-3 py-1 rounded ${
                          statusColors[sale.status]
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
