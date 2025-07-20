import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarSeller = () => {
  const location = useLocation();

  const sidebarLeft = [
    { name: "Dashboard", path: "/seller/seller-dashboard" },
    { name: "Profile Toko", path: "/seller/seller-profile" },
    { name: "Produk Saya", path: "/seller/manage-products" },
    { name: "Penjualan Saya", path: "/seller/manage-sales" },
    { name: "Data Pembeli", path: "/seller/buyer-data" },
    { name: "Kembali", path: "/" },
  ];

  return (
    <div className="w-1/5 h-screen px-5 py-20 bg-white">
      {sidebarLeft.map((item, index) => (
        <div
          key={index}
          className={`px-4 py-2 hover:bg-white cursor-pointer border-b mb-3 ${
            location.pathname === item.path ? "font-semibold text-black" : "text-gray-700"
          }`}
        >
          <Link to={item.path}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default SidebarSeller;
