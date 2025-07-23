import React, { useState, useEffect } from "react";
import axios from "axios";

const statusColors = {
  pending: "bg-gray-100 text-gray-700",
  paid: "bg-yellow-100 text-yellow-700",
  proses: "bg-blue-100 text-blue-700",
  dikirim: "bg-indigo-100 text-indigo-700",
  diterima: "bg-teal-100 text-teal-700",
  selesai: "bg-green-100 text-green-700",
};

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/all-transactions"
        );
        setTransactions(res.data);
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          💳 Laporan Transaksi
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left text-sm uppercase">
                <th className="px-4 py-3 rounded-tl-lg">No</th>
                <th className="px-4 py-3">Pengguna</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-4 py-3 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">{t.user}</td>
                  <td className="px-4 py-3 font-semibold">
                    Rp {t.total.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[t.status.toLowerCase()] ||
                        "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{t.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTransactions;
