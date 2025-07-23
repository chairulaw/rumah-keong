import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user");
        setUsers(res.data);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🔐 Kelola Pengguna
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-left text-sm uppercase">
                <th className="px-4 py-3 rounded-tl-lg">No</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Password</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-4 py-3 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">{u.nama}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.password}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : u.role === "penjual"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Tidak ada pengguna ditemukan.
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

export default ManageUsers;
