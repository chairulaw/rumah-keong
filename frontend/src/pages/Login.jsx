import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { heroImg } from "../assets/Assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.user || !data.token) {
        setErrorMsg(data.message || "Login gagal");
        toast.error(data.message || "Login gagal", { position: "top-right" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login berhasil!", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        const role = data.user.role;
        if (role === "Admin") {
          navigate("/admin/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
      toast.error("Terjadi kesalahan server.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      {/* ToastContainer cukup satu kali di halaman ini */}
      <ToastContainer />

      <div className="bg-transaparent backdrop-blur-sm shadow-md p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border-b focus:border-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border-b focus:border-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="flex justify-center mt-5 flex-col items-center gap-1">
          <Link
            to="/register"
            className="text-sm text-gray font-semibold hover:text-white hover:underline ease-in-out duration-100"
          >
            Create Account?
          </Link>
          <p>atau</p>
          <Link
            to="/"
            className="text-sm text-gray font-semibold hover:text-white hover:underline ease-in-out duration-100"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
