import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    no_hp: "",
    alamat: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (form.name)
        await fetch(`http://localhost:3000/api/auth/update-name/0`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ name: form.name }),
        });

      if (form.no_hp)
        await fetch(`http://localhost:3000/api/auth/update-nohp`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ no_hp: form.no_hp }),
        });

      if (form.alamat)
        await fetch(`http://localhost:3000/api/auth/update-alamat/0`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ alamat: form.alamat }),
        });

      if (form.currentPassword && form.newPassword)
        await fetch(`http://localhost:3000/api/auth/update-password/0`, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        });

      if (imageFile) {
        const formData = new FormData();
        formData.append("profile", imageFile);
        await fetch(`http://localhost:3000/api/auth/profile-image/0`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      toast.success("Berhasil Update Profil!", {
              position: "top-right",
              autoClose: 1500,
            });
    } catch (err) {
      toast.error("Gagal Update Profil!", {
              position: "top-right",
              autoClose: 1500,
            });
    }
  };
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Gagal ambil profil");

      const data = await res.json();
      setForm((prev) => ({
        ...prev,
        name: data.nama || "",
        no_hp: data.no_hp || "",
        alamat: data.alamat || "",
        email: data.email || "",
      }));

      if (data.profile_image_url) {
        setProfileImage(`http://localhost:3000/uploads/${data.profile_image_url}`);
      }

    } catch (err) {
      console.error("Gagal fetch profil:", err);
    }
  };

  fetchProfile();
}, []);




  return (
    <div className="h-fit flex justify-center mt-20">

      <ToastContainer />
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Hi, {form?.name || "User"}
        </h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-2">
            <img
              src={profileImage}
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

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              type="text"
              name="no_hp"
              placeholder="No handphone"
              value={form.no_hp}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email@gmail.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
            disabled
          />

          <textarea
            name="alamat"
            placeholder="Alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 resize-y min-h-[80px]"
            rows={3}
          />

          <div className="flex gap-4">
            <input
              type="password"
              name="currentPassword"
              placeholder="Password Lama"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="Password Baru"
              value={form.newPassword}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>

          <div className="flex gap-4 mt-5 justify-between">
            <button
              type="submit"
              className="w-fit bg-gray-700 cursor-pointer text-white p-2 rounded hover:bg-gray-600"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              className="w-fit bg-gray-700 cursor-pointer text-white p-2 rounded hover:bg-red-600"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Keluar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerDashboard;
