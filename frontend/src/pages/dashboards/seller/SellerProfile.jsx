import React, { useState, useEffect } from "react";

const SellerProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null); // simpan file asli
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    deskripsi: "",
    no_hp: "",
    email: "",
    logo_toko: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchToko = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/toko/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Gagal ambil data toko");

        const data = await res.json();
        setFormData({
          nama: data.nama || "",
          alamat: data.alamat || "",
          deskripsi: data.deskripsi || "",
          no_hp: data.no_hp || "",
          email: data.email || "",
          logo_toko: data.logo_toko || "",
        });
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data toko. Silakan login ulang.");
      }
    };

    fetchToko();
  }, [token]);

  const handleImageChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile); // simpan file untuk upload
      setProfileImage(URL.createObjectURL(uploadedFile)); // preview
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("nama", formData.nama);
    form.append("alamat", formData.alamat);
    form.append("deskripsi", formData.deskripsi);
    form.append("no_hp", formData.no_hp);
    form.append("email", formData.email);
    if (file) {
      form.append("logo_toko", file);
    }

    try {
      const res = await fetch("http://localhost:3000/api/toko/me", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Jangan set Content-Type di sini, biarkan browser yg set
        },
        body: form,
      });

      if (!res.ok) throw new Error("Gagal update toko");

      alert("Perubahan berhasil disimpan");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan.");
    }
  };

  return (
    <div className="h-fit flex justify-center mt-20">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Hi, {formData?.nama || "User"}
        </h2>

        {/* Foto Profil */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-2">
            {(profileImage || formData.logo_toko) && (
              <img
                src={
                  profileImage ||
                  `http://localhost:3000/uploads/${formData.logo_toko}`
                }
                alt="Logo Toko"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow"
              />
            )}

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama dan No HP */}
          <div className="flex gap-4">
            <input
              name="nama"
              type="text"
              placeholder="Nama Toko"
              value={formData.nama}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              name="no_hp"
              type="text"
              placeholder="No Handphone"
              value={formData.no_hp}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>

          {/* Email dan Password */}
          <div className="flex gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              type="password"
              placeholder="*******"
              className="w-full border-b border-gray-300 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Alamat dan Deskripsi */}
          <textarea
            name="alamat"
            placeholder="Alamat Toko"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 resize-y min-h-[80px]"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi Toko"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 resize-y min-h-[80px]"
          />

          {/* Tombol Aksi */}
          <div className="flex gap-4 mt-5 justify-between">
            <button
              type="submit"
              className="w-fit bg-gray-700 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="w-fit bg-gray-700 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Keluar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
