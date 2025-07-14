import React from "react";
import {
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";


const SellerDashboard = () => {
  const metrics = [
    {
      label: "Total Produk",
      value: 18,
      icon: <ShoppingBagIcon className="w-6 h-6 text-emerald-600" />,
      bg: "bg-indigo-500",
    },
    {
      label: "Total Penjualan",
      value: 43,
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-500",
    },
    {
      label: "Jumlah Pembeli",
      value: 12,
      icon: <UserGroupIcon className="w-6 h-6 text-orange-600" />,
      bg: "bg-teal-500",
    },
    {
      label: "Total Pendapatan",
      value: "Rp 12.750.000",
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

        {/* Tambahan bisa disisipkan di sini nanti (grafik, notifikasi, dll) */}
      </div>
    </div>
  );
};

export default SellerDashboard;
