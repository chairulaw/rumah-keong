import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation(); // state berisi product dan quantity
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

        if (!res.ok) return console.error("Gagal ambil profil pengguna");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error ambil profil:", err);
      }
    };

    fetchUserProfile();
  }, []);

  if (!state || !state.product || !state.quantity) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-[#f5f5f4]">
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
    const token = localStorage.getItem("token");

    const produk_list = [
      {
        id: product.id,
        quantity: quantity,
        harga_satuan: product.harga,
      },
    ];

    try {
      const snapResponse = await fetch("http://localhost:3000/api/transaksi/snap-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ produk_list }),
      });

      if (!snapResponse.ok) throw new Error("Gagal membuat Snap Token");

      const { snapToken } = await snapResponse.json();

      window.snap.pay(snapToken, {
        onSuccess: async function (result) {
          try {
            await fetch("http://localhost:3000/api/transaksi/konfirmasi", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                produk_list,
                order_id: result.order_id,
                payment_type: result.payment_type,
                total: result.gross_amount,
                toko_id: product.toko_id,
              }),
            });

            navigate(`/transaction-detail/${result.order_id}`, {
              state: { transactionId: result.order_id },
            });
          } catch (err) {
            console.error("Gagal menyimpan transaksi:", err);
          }
        },
        onError: function (err) {
          console.error("Pembayaran gagal:", err);
        },
      });
    } catch (err) {
      console.error("Gagal membuat Snap Token:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f5f5f4] overflow-y-auto py-10 px-4">
      {/* Rincian Produk */}
      <div className="bg-white p-6 rounded-md shadow-md border w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Rincian Produk</h2>
        <div className="flex gap-4">
          <img
            src={`http://localhost:3000/uploads/${product.gambar_produk[0]}`}
            alt={product.nama}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex flex-col justify-between">
            <p className="font-medium text-gray-900">{product.nama}</p>
            <p className="text-sm text-gray-600">Qty: {quantity}</p>
            <p className="text-sm text-green-700 font-semibold">
              IDR {(product.harga * quantity).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Alamat Pengiriman */}
      <div className="bg-white p-6 rounded-md shadow-md border w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Alamat Pengiriman</h2>
        <form className="space-y-4">
          {[
            { label: "Nama Lengkap", value: user?.nama },
            { label: "Alamat", value: user?.alamat },
            { label: "No. HP", value: user?.no_hp },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="text-xs text-gray-500 font-medium block uppercase mb-1 tracking-wider">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value || ""}
                readOnly
                className="w-full bg-gray-100 border-none py-2 px-3 rounded text-gray-700"
              />
            </div>
          ))}
        </form>
      </div>

      {/* Metode Pembayaran */}
      <div className="bg-white p-6 rounded-md shadow-md border w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Metode Pembayaran</h2>
        <div className="border border-gray-300 rounded p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="radio" name="payment" checked readOnly />
            <span className="text-sm font-medium text-gray-700">Payment Gateway (Mbanking, Ewallet, Qris)</span>
          </div>
          <span className="text-sm font-semibold text-black">
            Total: IDR {(product.harga * quantity).toLocaleString("id-ID")}
          </span>
        </div>

        <button
          onClick={handlePay}
          className="bg-black w-full cursor-pointer text-white px-6 py-3 rounded hover:bg-gray-800 transition font-semibold text-sm"
        >
          Bayar Sekarang
        </button>

        <button
          onClick={() => navigate(`/detail-product/${product.id}`)}
          className="mt-3 text-center cursor-pointer w-full text-sm text-red-600 hover:underline transition"
        >
          Batal Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
