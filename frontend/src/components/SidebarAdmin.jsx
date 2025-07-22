import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Anda yakin ingin logout?");
    if (confirmed) {
      // Tambahkan proses logout (hapus token, clear session, dll) jika ada
      navigate("/login"); // Ganti ke route login kamu
    }
  };

  const sidebarLeft = [
    { name: "Dashboard", path: "/admin/admin-dashboard" },
    { name: "Manage Transactions", path: "/admin/manage-transactions" },
    { name: "Manage Users", path: "/admin/manage-users" },
    { name: "Logout", isLogout: true },
  ];

  return (
    <div className="w-1/5 min-h-screen px-5 py-20 bg-white">
      {sidebarLeft.map((item, index) => (
        <div
          key={index}
          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b mb-3 ${
            location.pathname === item.path ? "font-semibold text-black" : "text-gray-700"
          }`}
          onClick={() => {
            if (item.isLogout) {
              handleLogout();
            }
          }}
        >
          {!item.isLogout ? (
            <Link to={item.path}>{item.name}</Link>
          ) : (
            <span>{item.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarAdmin;
