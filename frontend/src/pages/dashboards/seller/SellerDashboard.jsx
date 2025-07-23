import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const SellerDashboard = () => {
  const [data, setData] = useState({
    total_produk: 0,
    total_penjualan: 0,
    jumlah_pembeli: 0,
    total_pendapatan: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          console.warn("Token tidak ditemukan di localStorage");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/toko/my-dashboard",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Gagal ambil data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Gagal ambil dashboard:", error.message);
      }
    };

    fetchDashboard();
  }, []);

  const metrics = [
    {
      label: "Total Produk",
      value: data.total_produk,
      icon: <ShoppingBagIcon className="w-6 h-6 text-emerald-600" />,
      bg: "bg-indigo-500",
    },
    {
      label: "Total Penjualan",
      value: data.total_penjualan,
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-500",
    },
    {
      label: "Jumlah Pembeli",
      value: data.jumlah_pembeli,
      icon: <UserGroupIcon className="w-6 h-6 text-orange-600" />,
      bg: "bg-teal-500",
    },
    {
      label: "Total Pendapatan",
      value: `Rp ${Number(data.total_pendapatan).toLocaleString("id-ID")}`,
      icon: <CurrencyDollarIcon className="w-6 h-6 text-green-600" />,
      bg: "bg-green-500",
    },
  ];

  return (
    <div className="flex justify-center mt-20 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          🧾 Dashboard Penjualan Toko: Rumah Keong
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md flex items-center p-5 ${metric.bg} text-white hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="p-3 bg-white bg-opacity-20 rounded-full mr-4">
                {metric.icon}
              </div>
              <div>
                <div className="text-sm">{metric.label}</div>
                <div className="text-xl font-bold">
                  {typeof metric.value === "number"
                    ? metric.value.toLocaleString()
                    : metric.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section tambahan: grafik, list transaksi, notifikasi, dll */}
      </div>
    </div>
  );
};

export default SellerDashboard;
