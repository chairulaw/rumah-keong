import React from "react";
import { useState } from "react";

const ManageTransactions = () => {
  const [transactions] = useState([
    { id: 1, user: "Budi", total: 120000, status: "selesai", tanggal: "2025-07-10" },
    { id: 2, user: "Sari", total: 75000, status: "dikirim", tanggal: "2025-07-09" },
    { id: 3, user: "Joko", total: 56000, status: "pending", tanggal: "2025-07-08" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Laporan Transaksi</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Pengguna</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={t.id} className="text-sm text-gray-700">
                <td className="px-4 py-2 border">{i + 1}</td>
                <td className="px-4 py-2 border">{t.user}</td>
                <td className="px-4 py-2 border">Rp {t.total.toLocaleString()}</td>
                <td className="px-4 py-2 border capitalize">{t.status}</td>
                <td className="px-4 py-2 border">{t.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageTransactions