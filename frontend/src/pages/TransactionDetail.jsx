import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TransactionDetail = () => {
  const { state } = useLocation();
  const [details, setDetails] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [toko, setToko] = useState(null);
  const [transaksiInfo, setTransaksiInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const transactionId = state?.transactionId;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!transactionId) return;

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/transaksi/pembeli/${transactionId}/invoice`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


        if (res.ok) {
          const data = await res.json();
          setDetails(data.produk_list);
          setGrandTotal(data.grand_total);
          setToko(data.transaksi?.nama_toko || null);
          setTransaksiInfo(data.transaksi);
        } else {
          console.error("Gagal mengambil detail transaksi");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [transactionId]);

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#f9f6f1] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
            Mohon menunggu, barang anda akan segera dikirimkan
          </h1>
          {toko && (
            <p className="text-gray-600 text-sm mt-2">
              Toko: <span className="font-medium">{toko}</span>
            </p>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Memuat detail transaksi...</p>
        ) : (
          <>
            {/* Rincian Pembayaran */}
            {transaksiInfo && (
              <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Rincian Pembayaran</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="block text-gray-500">No. Transaksi</span>
                    {transaksiInfo.id}
                  </div>
                  <div>
                    <span className="block text-gray-500">Metode Pembayaran</span>
                    {transaksiInfo.payment_method || "-"}
                  </div>
                  <div>
                    <span className="block text-gray-500">Status</span>
                    {transaksiInfo.status || "-"}
                  </div>
                  <div>
                    <span className="block text-gray-500">Waktu Pembayaran</span>
                    {new Date(transaksiInfo.created_at).toLocaleString("id-ID")}
                  </div>
                  {/* Tambahkan kolom tambahan jika kamu menyimpan no_referensi, lokasi_merchant, nama_pengakuisisi, dll */}
                </div>
              </div>
            )}

            {/* Detail Produk */}
            <div className="space-y-6">
  {details.map((item) => {
  // Parse gambar_produk jika dalam bentuk string array
  let gambarList = [];
  try {
    gambarList = JSON.parse(item.gambar_produk);
  } catch (err) {
    console.error("Gagal parse gambar_produk:", item.gambar_produk);
  }

  const gambarUtama = gambarList[0] || "/default-image.jpg";

  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
    >
      {/* Gambar Produk */}
      <img
        src={`http://localhost:3000/uploads/${gambarUtama}`}
        alt={item.nama_produk}
        className="w-24 h-24 object-cover rounded-xl mb-4 md:mb-0 md:mr-6"
      />

      {/* Info Produk */}
      <div className="flex-1">
        <h2 className="text-lg font-medium text-gray-800">
          {item.nama_produk || `Produk ID: ${item.produk_id}`}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium">{toko}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Quantity: <span className="font-medium">{item.quantity}</span>
        </p>
        <p className="text-sm text-gray-500">
          Harga Satuan:{" "}
          <span className="font-medium">
            Rp {item.harga_satuan.toLocaleString("id-ID")}
          </span>
        </p>
      </div>

      {/* Subtotal */}
      <div className="text-right text-gray-700 mt-4 md:mt-0">
        <p className="text-sm uppercase text-gray-400">Subtotal</p>
        <p className="text-xl font-semibold text-green-700">
          Rp {(item.quantity * item.harga_satuan).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
})}




              {/* Grand Total */}
              <div className="text-right mt-8">
                <h3 className="text-lg font-semibold text-gray-800">Total Pembayaran:</h3>
                <p className="text-2xl text-green-600 font-bold">
                  Rp {grandTotal.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tombol Kembali */}
<div className="text-center mt-10">
  <Link
    to="/"
    className="inline-block px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-200"
  >
    Kembali ke Halaman Utama
  </Link>
</div>

    </section>
  );
};

export default TransactionDetail;
