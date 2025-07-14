import React from "react";
import { heroImg } from "../assets/Assets";

const Register = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundOpacity: 0.8,
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>
        <form className="space-y-4">
          {/* First Name + Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="password"
            placeholder="Re-type Password"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <select className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2">
            <option value="">Sign Up as</option>
            <option value="option1">Customer</option>
            <option value="option3">Seller</option>
          </select>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded mt-4 font-semibold hover:bg-black transition"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
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
