import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoKeong } from "../assets/assets";
import { FaInstagram, FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemsLeft = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Belanja", path: "/store" },
  ];

  const navItemsRight = [
    { name: "Masuk", path: "/login" },
    { name: "Hubungi Kami", path: "/#" },
    // { icon: <FaCartShopping />, path: "/cart" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 lg:px-18 py-6 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent  backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between">
  {/* Left Nav */}
  <nav className="flex gap-6 text-lg text-black flex-1">
    {navItemsLeft.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="hover:underline underline-offset-8 hover:text-blue-600 transition-colors duration-200"
      >
        {item.name}
      </Link>
    ))}
  </nav>

  {/* Center Logo */}
  <Link to="/" className="flex justify-center items-center w-72 flex-shrink-0">
    <img
      src={logoKeong}
      alt="Rumah Keong Logo"
      className="w-full object-contain hover:opacity-80 transition-opacity duration-300"
    />
  </Link>

  {/* Right Nav */}
  <nav className="flex items-center gap-6 text-lg text-black flex-1 justify-end">
    <Link
      to={navItemsRight[0].path}
      className="hover:underline underline-offset-8 hover:text-blue-600 transition-colors duration-200 "
    >
      {navItemsRight[0].name}
    </Link>

    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-600 transition-colors duration-200"
    >
      <FaInstagram size={20} />
    </a>

    {/* <Link
      to={navItemsRight[2].path}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-600 transition-colors duration-200"
    >
      <FaCartShopping size={20} />
    </Link> */}
    
    <Link
      to={navItemsRight[1].path}
      className="p-2 border text-sm rounded-full text-black hover:bg-blue-400 hover:text-white transition-colors duration-200"
    >
      {navItemsRight[1].name}
    </Link>
  </nav>
</div>
    </header>
  );
};

export default Header;
