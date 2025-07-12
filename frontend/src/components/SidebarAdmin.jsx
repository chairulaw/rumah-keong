import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  LogOut
} from "lucide-react";

const SidebarAdmin = () => {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/dashboards/admin" },
    { label: "Kelola Pengguna", icon: <Users className="w-5 h-5" />, path: "/dashboards/admin/manage-users" },
    { label: "Kelola Produk", icon: <Package className="w-5 h-5" />, path: "/dashboards/admin/manage-products" },
    { label: "Laporan Transaksi", icon: <FileText className="w-5 h-5" />, path: "/dashboards/admin/transaction-reports" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm fixed top-0 left-0 hidden md:block">
      <div className="p-6 font-bold text-xl text-gray-800 border-b">Admin Panel</div>
      <nav className="p-4 flex flex-col gap-1">
        {menu.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <button
          onClick={() => alert("Fungsi logout belum dihubungkan.")}
          className="flex items-center gap-3 px-4 py-2 mt-4 text-sm text-red-500 hover:bg-red-100 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
