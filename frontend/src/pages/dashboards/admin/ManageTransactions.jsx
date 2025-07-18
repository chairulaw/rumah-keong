import React, { useState } from "react";

const ManageTransactions = () => {
  const [transactions] = useState([
    { id: 1, user: "Budi", total: 120000, status: "selesai", tanggal: "2025-07-10" },
    { id: 2, user: "Sari", total: 75000, status: "dikirim", tanggal: "2025-07-09" },
    { id: 3, user: "Joko", total: 56000, status: "pending", tanggal: "2025-07-08" },
  ]);

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
                        t.status === "selesai"
                          ? "bg-green-100 text-green-700"
                          : t.status === "dikirim"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
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
