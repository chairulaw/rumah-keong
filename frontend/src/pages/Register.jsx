import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { heroImg } from "../assets/Assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { nama, email, password, confirmPassword, role } = form;

    if (!nama || !email || !password || !confirmPassword || !role) {
      setIsLoading(false);
      return setError("Semua field wajib diisi.");
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      return setError("Password tidak cocok.");
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      toast.success("Registrasi berhasil! Silakan login.", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <ToastContainer />
      <div className="bg-transaparent shadow-md backdrop-blur-sm p-6 rounded-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Username"
            value={form.nama}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-type Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-500"
          >
            <option value="" disabled>
              Daftar Sebagai
            </option>
            <option value="Admin">Admin</option>
            <option value="Pembeli">Customer</option>
            <option value="Penjual">Penjual</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-800 text-white py-2 rounded mt-4 font-semibold transition ${
              isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-black"
            }`}
          >
            {isLoading ? "Mendaftarkan..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-gray-700 font-semibold text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
