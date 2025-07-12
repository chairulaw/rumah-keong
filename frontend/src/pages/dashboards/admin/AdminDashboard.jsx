import React, { useEffect, useState } from "react";
import { Users, ShoppingCart, UserPlus, DollarSign, BarChart2 } from "lucide-react"; // pakai lucide-react

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalBuyers: 0,
    totalTransactions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const dummyUsers = [
      { id: 1, role: "admin" },
      { id: 2, role: "penjual" },
      { id: 3, role: "pembeli" },
      { id: 4, role: "penjual" },
      { id: 5, role: "pembeli" },
    ];

    const dummyTransactions = [
      { id: 1, total: 100000 },
      { id: 2, total: 250000 },
      { id: 3, total: 175000 },
    ];

    const totalUsers = dummyUsers.length;
    const totalSellers = dummyUsers.filter((u) => u.role === "penjual").length;
    const totalBuyers = dummyUsers.filter((u) => u.role === "pembeli").length;
    const totalTransactions = dummyTransactions.length;
    const totalRevenue = dummyTransactions.reduce((sum, trx) => sum + trx.total, 0);

    setStats({
      totalUsers,
      totalSellers,
      totalBuyers,
      totalTransactions,
      totalRevenue,
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Admin</h1>
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
          value={`Rp ${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="text-green-600 w-6 h-6" />}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="bg-gray-100 p-2 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
