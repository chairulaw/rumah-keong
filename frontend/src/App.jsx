import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// COMPONENTS
import Header from "./components/Header";
import SidebarCustomer from "./components/SidebarCustomer";

// PAGES
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Store from "./pages/Store";
import CustomerDashboard from "./pages/dashboards/customer/CustomerDashboard";
import CustomerAddress from "./pages/dashboards/customer/CustomerAddress";

//DASHBOARD
import AdminDashboard from "./pages/dashboards/admin/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const isCustomerPath = location.pathname.startsWith("/customer");

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f6f1] text-[#1c1c1c] scroll-smooth">
      {/* Header */}
      <Header />

      <div
        className={`flex-1 w-full h-screen overflow-hidden ${
          isHomepage ? "" : "pt-40"
        }`}
      >
        {isCustomerPath ? (
          <div className="flex h-full">
            <SidebarCustomer />
            <div className="flex-1">
              <Routes>
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/customer-address" element={<CustomerAddress />} />
                {/* Tambahkan route customer lain di sini */}
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/store" element={<Store />} />
            {/* Route customer tidak di sini */}
          </Routes>
        )}
      </div>

      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} Rumah Keong
      </footer>
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;