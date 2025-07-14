import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const location = useLocation();

  const sidebarLeft = [
    { name: "Dashboard", path: "seller/seller-dashboard" },
    { name: "Profile", path: "seller/seller-profile" },
    { name: "Manage Products", path: "/seller/manage-products" },
    { name: "Manage Sales", path: "/seller/manage-sales" },
    { name: "Buyer Data", path: "/seller/buyer-data" },
  ];

  return (
    <div className="w-1/5 h-screen bg-white px-5 ">
      {sidebarLeft.map((item, index) => (
        <div
          key={index}
          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b mb-3 ${
            location.pathname === item.path ? "font-semibold text-black" : "text-gray-700"
          }`}
        >
          <Link to={item.path}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default SidebarAdmin;
