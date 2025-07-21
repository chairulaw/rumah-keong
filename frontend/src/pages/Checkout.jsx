import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation(); // state berisi product dan quantity
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Ambil data user (nama, alamat, no_hp)
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
        setUser(data);
      } catch (err) {
        console.error("Error ambil profil:", err);
      }
    };

    fetchUserProfile();
  }, []);

  // Cek apakah data produk dan quantity tersedia
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
  const token = localStorage.getItem("token");

  const produk_list = [
    {
      id: product.id,
      quantity: quantity,
      harga_satuan: product.harga,
    },
  ];

  try {
    // Step 1: Dapatkan Snap Token dulu
    const snapResponse = await fetch("http://localhost:3000/api/transaksi/snap-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ produk_list }),
    });

    if (!snapResponse.ok) {
      throw new Error("Gagal membuat Snap Token");
    }

    const { snapToken } = await snapResponse.json();

    // Step 2: Midtrans pop-up
    window.snap.pay(snapToken, {
      onSuccess: async function (result) {
        try {
          // Step 3: Simpan transaksi ke DB setelah sukses bayar
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
    toko_id: product.toko_id, // ✅ TAMBAHKAN INI
  }),
});


          navigate(`/transaction-detail/${result.order_id}`, {
  state: {
    transactionId: result.order_id,
  },
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
    <div className="flex flex-col items-center min-h-screen bg-[#f9f6f1] overflow-y-auto py-10">
      {/* Rincian Produk */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mb-5">
        <h1 className="text-black font-semibold mb-4">Rincian Produk</h1>
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

      {/* Alamat Pengiriman */}
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
