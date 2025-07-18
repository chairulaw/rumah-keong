import React from "react";

const Checkout = () => {

  const handlePay = async () => {
    // Simulasikan ambil snapToken dari backend
    const response = await fetch("http://localhost:3000/api/create-transaction", {
      method: "POST",
    });
    const data = await response.json();

    // Snap token dari backend
    const snapToken = data.snapToken;

    // Panggil Snap JS Midtrans
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
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f9f6f1] overflow-y-auto py-10">
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mb-5">
        <h1 className=" text-black font-semibold mb-4">Akun Anda</h1>
        <p className="text-gray-600">remainsguy@gmail.com</p>
      </div>

      {/* delivery */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md">
        <h1 className=" text-black font-semibold mb-4">Pengiriman</h1>

        <div className="border border-gray-300 rounded mb-4">
          <h2 className="text-xs font-semibold text-gray-500 px-4 pt-4 pb-2 uppercase tracking-wider">
            Opsi Pengiriman
          </h2>
          <div className="divide-y divide-gray-200">
            {/* Option 1 */}
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value="local"
                  className="accent-black"
                  defaultChecked
                />
                <span className="text-sm text-black font-medium">
                  Pengiriman lokal (3 - 5 Hari Kerja)
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                IDR 50.000
              </span>
            </label>
            {/* Option 2 */}
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    className="accent-black"
                  />
                  <span className="text-sm text-black font-medium">
                    Ambil Langsung di Toko
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-7">
                  Pengambilan Sendiri
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-700">
                  GRATIS
                </span>
              </div>
            </label>
          </div>
        </div>

        <h1 className="text-black font-semibold mb-4">Alamat Pengiriman</h1>
        <form className="space-y-4">
          {/* Nama Lengkap */}
          <div className="grid grid-cols-1  gap-4">
            <div>
              <label
                htmlFor="nama-lengkap"
                className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama-lengkap"
                placeholder="Nama Lengkap"
                className="w-full bg-gray-100 border-none py-3 px-3"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
              Alamat
            </label>
            <input
              type="text"
              placeholder="Address 1"
              className="w-full bg-gray-100 border-none py-3 px-3 mb-3"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
              Nomor Telepon
            </label>
            <input
              type="text"
              placeholder="Nomor Telepon"
              className="w-full bg-gray-100 border-none py-3 px-3"
            />
          </div>
        </form>
        <div className=" mt-4">
          <button className="bg-black w-full text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-200">
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mt-5">
      <h1 className="text-black font-semibold mb-4">Metode Pembayaran</h1>

      <div className="border border-gray-300 rounded mb-4 p-4">
        <div className="flex items-center gap-3">
          <input type="radio" name="payment" checked readOnly />
          <span className="text-sm text-black font-medium">Bayar via Midtrans</span>
        </div>
        <span className="text-sm font-semibold text-gray-700">IDR 50.000</span>
      </div>

      <button
        onClick={handlePay}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Bayar Sekarang
      </button>
    </div>
    {/* Optional fallback: COD
    <div className="border border-gray-300 rounded mb-4 p-3 opacity-50 pointer-events-none">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="payment"
          value="cod"
          disabled
        />
        <span className="text-sm text-gray-500 font-medium">
          (COD) Cash on Delivery
        </span>
      </div>
      <span className="text-sm text-gray-500">Tidak tersedia untuk saat ini</span>
    </div> */}

    </div>
  );
};

export default Checkout;
