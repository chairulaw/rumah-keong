import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Gagal ambil profil pengguna");
        return;
      }

      const data = await res.json();
      setUser(data); // sekarang berisi nama, alamat, no_hp
      console.log("Profil lengkap:", data);

    } catch (err) {
      console.error("Error ambil profil:", err);
    }
  };

  fetchUserProfile();
}, []);



  if (!state || !state.product || !state.quantity) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-gray-600 mb-4">Data produk tidak ditemukan.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const { product, quantity } = state;

  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          amount: product.harga * quantity,
          customer: {
            nama: user?.nama,
            alamat: user?.alamat,
            no_hp: user?.no_hp,
          },
        }),
      });

      const data = await response.json();
      const snapToken = data.snapToken;

      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Success:", result);
          alert("Pembayaran berhasil!");
        },
        onPending: (result) => {
          console.log("Pending:", result);
          alert("Menunggu pembayaran...");
        },
        onError: (error) => {
          console.error("Error:", error);
          alert("Terjadi kesalahan pembayaran.");
        },
      });
    } catch (err) {
      console.error("Transaksi gagal:", err);
      alert("Gagal membuat transaksi.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f9f6f1] overflow-y-auto py-10">
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mb-5">
        <h1 className=" text-black font-semibold mb-4">Rincian Produk</h1>
        <div className="flex gap-4">
          <img
            src={`http://localhost:3000/uploads/${product.gambar_produk[0]}`}
            alt={product.nama}
            className="w-28 h-28 object-cover rounded"
          />
          <div className="flex flex-col justify-between">
            <p className="font-medium text-black">{product.nama}</p>
            <p className="text-sm text-gray-600">Qty: {quantity}</p>
            <p className="text-sm text-green-800 font-semibold">
              IDR {(product.harga * quantity).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Alamat Pengiriman Otomatis */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md">
        <h1 className="text-black font-semibold mb-4">Alamat Pengiriman</h1>
        <form className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider block">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={user?.nama || ""}
              readOnly
              className="w-full bg-gray-100 border-none py-3 px-3"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider block">
              Alamat
            </label>
            <input
              type="text"
              value={user?.alamat || ""}
              readOnly
              className="w-full bg-gray-100 border-none py-3 px-3"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider block">
              No. HP
            </label>
            <input
              type="text"
              value={user?.no_hp || ""}
              readOnly
              className="w-full bg-gray-100 border-none py-3 px-3"
            />
          </div>
        </form>
      </div>

      {/* Metode Pembayaran */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mt-5">
        <h1 className="text-black font-semibold mb-4">Metode Pembayaran</h1>

        <div className="border border-gray-300 rounded mb-4 p-4">
          <div className="flex items-center gap-3">
            <input type="radio" name="payment" checked readOnly />
            <span className="text-sm text-black font-medium">Bayar via Midtrans</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Total: IDR {(product.harga * quantity).toLocaleString("id-ID")}
          </span>
        </div>

        <button
          onClick={handlePay}
          className="bg-black w-full text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Bayar Sekarang
        </button>

        <button
  onClick={() => navigate(`/detail-product/${product.id}`)}
  className="mt-3 text-center cursor-pointer w-full text-red-600 hover:underline transition"
>
  Batal Checkout
</button>

      </div>
    </div>
  );
};

export default Checkout;
