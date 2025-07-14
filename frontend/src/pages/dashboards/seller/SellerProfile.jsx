import React, { useState } from "react";

const SellerProfile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="h-fit flex justify-center mt-20">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Hi, Remainsguy
        </h2>
        {/* Foto Profil Bulat */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-2">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow"
            />
            <label className="absolute bottom-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-900">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-xs">Ganti</span>
            </label>
          </div>
        </div>
        <form className="space-y-4">
          {/* First Name + Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nama Toko"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              type="text"
              placeholder="No handphone"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>

          <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email@gmail.com"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />
          <input
            type="password"
            placeholder="*******"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />
          </div>

          {/* Ganti input alamat menjadi textarea agar lebih luas */}
          <textarea
            placeholder="Alamat Toko"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 resize-y min-h-[80px]"
            rows={3}
          />

          <textarea
            placeholder="Deskripsi Toko"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 resize-y min-h-[80px]"
            rows={3}
          />

        </form>

        <div className="flex gap-4 mt-5 justify-between">
          <button className="w-fit bg-gray-700 cursor-pointer text-white p-2 rounded hover:bg-gray-600">
            Simpan Perubahan
          </button>
          <button className="w-fit bg-gray-700 cursor-pointer text-white p-2 rounded hover:bg-red-600">
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
