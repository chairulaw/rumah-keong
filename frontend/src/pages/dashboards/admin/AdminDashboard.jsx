import React from "react";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  // Data dummy sebagai pengganti API
  const [users, setUsers] = useState([
    { id: 1, nama: "Andi", email: "andi@example.com", role: "admin" },
    { id: 2, nama: "Budi", email: "budi@example.com", role: "penjual" },
    { id: 3, nama: "Citra", email: "citra@example.com", role: "pembeli" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleDelete = (userId) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <p className="text-gray-500">Memuat data pengguna...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-3 border-b">No</th>
                <th className="px-4 py-3 border-b">Nama</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Role</th>
                <th className="px-4 py-3 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{user.nama}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b capitalize">{user.role}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;