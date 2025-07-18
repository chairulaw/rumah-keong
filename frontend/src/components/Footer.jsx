import React from 'react';
import { logoKeongPutih } from '../assets/Assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-10 py-16">
      <div className="max-w-8xl mx-20 grid grid-cols-1 md:grid-cols-2">
        {/* Logo & Deskripsi */}
        <div className="flex flex-col items-start">
          <img src={logoKeongPutih} alt="Rumah Keong Logo" className="h-12 w-auto mb-4" />
          <p className="text-sm text-gray-400 max-w-sm">
            Menginspirasi dari alam dan keindahan rumah keong.
          </p>
        </div>

        {/* Info Lain */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Plant Care</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">Jl. Rumah Keong No. 7</p>
            <p className="text-sm text-gray-400">Jakarta, Indonesia</p>
            <a
              href="mailto:kontak@rumahkeong.id"
              className="text-sm text-gray-400 hover:underline"
            >
              kontak@rumahkeong.id
            </a>
          </div>
      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-500">
        Rumah Keong &copy; {new Date().getFullYear()}
      </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
