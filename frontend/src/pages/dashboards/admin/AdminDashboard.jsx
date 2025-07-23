import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, ShoppingCart, UserPlus, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalBuyers: 0,
    totalTransactions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/stats");

        // pastikan totalRevenue adalah angka
        const cleanRevenue = Number(res.data.totalRevenue) || 0;

        setStats({
          ...res.data,
          totalRevenue: cleanRevenue,
        });
      } catch (error) {
        console.error("Gagal fetch data statistik admin:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="py-20 px-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Dashboard Admin
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Pengguna"
          value={stats.totalUsers}
          icon={<Users className="text-blue-600 w-6 h-6" />}
        />
        <StatCard
          title="Total Penjual"
          value={stats.totalSellers}
          icon={<UserPlus className="text-emerald-600 w-6 h-6" />}
        />
        <StatCard
          title="Total Pembeli"
          value={stats.totalBuyers}
          icon={<UserPlus className="text-indigo-600 w-6 h-6" />}
        />
        <StatCard
          title="Total Transaksi"
          value={stats.totalTransactions}
          icon={<ShoppingCart className="text-orange-500 w-6 h-6" />}
        />
        <StatCard
          title="Total Pendapatan"
          value={`Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}
          icon={<DollarSign className="text-green-600 w-6 h-6" />}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
    </div>
  </div>
);

export default AdminDashboard;
