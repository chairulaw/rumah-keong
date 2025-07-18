import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// COMPONENTS
import Header from "./components/Header";
import SidebarCustomer from "./components/SidebarCustomer";
import SidebarAdmin from "./components/SidebarAdmin";
import SidebarSeller from "./components/SidebarSeller";
import Footer from "./components/Footer";

// PAGES
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import CustomerDashboard from "./pages/dashboards/customer/CustomerDashboard";
import CustomerAddress from "./pages/dashboards/customer/CustomerAddress";
import ProductDetail from "./pages/store/ProductDetail";
import StorePages from "./pages/store/StorePages";
import DetailStore from "./pages/store/DetailStore";

//DASHBOARD USERS
import AdminDashboard from "./pages/dashboards/admin/AdminDashboard";
import ManageUsers from "./pages/dashboards/admin/ManageUsers";
import ManageTransactions from "./pages/dashboards/admin/ManageTransactions";


//DASHBOARD SELLER
import SellerDashboard from "./pages/dashboards/seller/SellerDashboard";
import SellerProfile from "./pages/dashboards/seller/SellerProfile";
import ManageProducts from "./pages/dashboards/seller/ManageProducts";
import BuyerData from "./pages/dashboards/seller/BuyerData";
import ManageSales from "./pages/dashboards/seller/ManageSales";

//DASHBOARD ADMIN


function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const isCustomerPath = location.pathname.startsWith("/customer");
  const isAdminPath = location.pathname.startsWith("/admin");
  const isSellerPath = location.pathname.startsWith("/seller");

  const hideHeaderPaths = [
    "/login",
    "/register",
    "/admin/admin-dashboard",
    "/admin/manage-users",
    "/admin/manage-transactions",
    "/seller/seller-dashboard",
    "/seller/seller-profile",
    "/seller/manage-products",
    "/seller/manage-sales",
    "/seller/buyer-data",
    "/customer-dashboard",
    "/customer-address",
  ];

  const isDashboardPath = isCustomerPath || isAdminPath || isSellerPath;

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f6f1] text-[#1c1c1c] scroll-smooth">
      {/* Header hanya untuk public page */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}

      {/* Content */}
      <div className={`flex-1 w-full overflow-hidden ${!isDashboardPath && !isHomepage ? "pt-20" : ""}`}>
        {isCustomerPath ? (
          <div className="flex h-full">
            <SidebarCustomer />
            <div className="flex-1">
              <Routes>
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/customer-address" element={<CustomerAddress />} />
              </Routes>
            </div>
          </div>
        ) : isAdminPath ? (
          <div className="flex h-full">
            <SidebarAdmin />
            <div className="flex-1">
              <Routes>
                <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/manage-transactions" element={<ManageTransactions />} />
              </Routes>
            </div>
          </div>
        ) : isSellerPath ? (
          <div className="flex h-full">
            <SidebarSeller />
            <div className="flex-1">
              <Routes>
                <Route path="/seller/seller-dashboard" element={<SellerDashboard />} />
                <Route path="/seller/seller-profile" element={<SellerProfile />} />
                <Route path="/seller/manage-products" element={<ManageProducts />} />
                <Route path="/seller/manage-sales" element={<ManageSales />} />
                <Route path="/seller/buyer-data" element={<BuyerData />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/store-pages" element={<StorePages />} />
            <Route path="/detail-store/:id" element={<DetailStore />} />
            <Route path="/detail-product/:id" element={<ProductDetail />} />
          </Routes>
        )}
      </div>

      {/* Footer tetap tampil di semua halaman */}
      <Footer />
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