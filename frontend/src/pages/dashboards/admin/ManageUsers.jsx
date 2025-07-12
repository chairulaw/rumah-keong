import React from "react";
import { useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, nama: "Budi", email: "budi@gmail.com", role: "pembeli" },
    { id: 2, nama: "Sari", email: "sari@tokoku.com", role: "penjual" },
    { id: 3, nama: "Admin", email: "admin@admin.com", role: "admin" },
  ]);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Kelola Pengguna</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="text-sm text-gray-700">
                <td className="px-4 py-2 border">{i + 1}</td>
                <td className="px-4 py-2 border">{u.nama}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border capitalize">{u.role}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;