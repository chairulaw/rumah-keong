import React from "react";
import { Link } from "react-router-dom";
import { heroImg } from "../assets/Assets";

const Login = () => {
  return (
    <div className="fixed inset-0  flex justify-center items-center"
    style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundOpacity: 0.8,
            backdropFilter: "blur(5px)",
          }}>
      <div className="bg-transaparent shadow-md backdrop-blur-sm p-6 rounded-xl w-[100%] max-w-lg  relative">
        <h2 className="text-2xl font-semibold mb-4 justify-center flex">
          Login
        </h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border-b focus:border-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border-b focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center mt-5">
          <Link
            to="/register"
            className="text-sm text-gray-600 font-semibold hover:underline"
          >
            Create Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
