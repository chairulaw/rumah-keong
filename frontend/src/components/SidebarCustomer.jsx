import React from "react";
import { Link } from "react-router-dom";

const SidebarCustomer = () => {
  const sidebarLeft = [
    { name: "Profil Saya", path: "/customer-dashboard" },
    { name: "Pesanan Saya", path: "/customer-orders" },
    { name: "Kembali", path: "/" },
  ];

  return (
    <div className="w-1/5 min-h-screen px-5 mt-20">
      {sidebarLeft.map((item, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-white cursor-pointer border-b mb-3"
        >
          <Link to={item.path}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default SidebarCustomer;
