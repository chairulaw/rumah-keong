import React from "react";
import { Link } from "react-router-dom";
import { heroImg, aboutImg, highlightImg } from "../assets/Assets";
import FadeContent from "../hooks/FadeContent";
import ScrollVelocity from "../hooks/ScrollVelocity";

const Homepage = () => {
  const products = [
    {
      name: "Cascading Hawthorn Bonsai (Japan)",
      price: "from IDR 1,500,000",
      image: heroImg, // tanpa kurung kurawal
      soldOut: true,
    },
    {
      name: "Bending Manuka Myrtle (Japan)",
      price: "from IDR 1,500,000",
      image: heroImg,
      soldOut: true,
    },
    {
      name: "Isozansho Bonsai",
      price: "from IDR 1,500,000",
      image: heroImg,
      soldOut: true,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <img
          src={heroImg}
          alt="Rumah Keong Hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-regular text-white leading-snug mb-6">
              ‘Rumahnya aksesoris <br className="hidden sm:block" /> Batam’
            </h1>

            <Link
              to="/shop"
              className="inline-block px-6 py-2 border border-white text-white rounded-full text-sm hover:bg-[#1c1c1c] hover:border-[#1c1c1c] shadow-lg hover:text-white transition-colors duration-200"
            >
              Belanja Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight 1 Product Section */}
      <section>
        <FadeContent
          blur={true}
          duration={300}
          easing="ease-out"
          initialOpacity={0}
        >
          <div className="bg-[#f9f6f1] py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w mx-auto">
              <div className="relative w-full h-[31rem] rounded-lg shadow-lg overflow-hidden">
                <img
                  src={highlightImg}
                  alt="Highlighted Product"
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-6 w-full md:w-2/3 rounded-b-lg z-10">
                  <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">
                    Berbagai macam Toko
                  </h2>
                  <p className="text-lg text-gray-200 mb-4">
                    Temukan berbagai macam toko aksesoris pilihan anda
                  </p>
                  <Link
                    to="/shop"
                    className="inline-block px-6 py-2 border border-white text-white rounded-full text-sm hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      <FadeContent>
        <ScrollVelocity
          texts={["/assets/logoKeong.png", "/assets/logoKeong.png"]}
          velocity={100}
          className="mx-10"
        />
      </FadeContent>

      {/* About Us Section */}
      <section className="bg-[#f9f6f1] py-20 px-6 md:px-12 lg:px-20">
        <FadeContent>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2">
              <img
                src={aboutImg}
                alt="About Us"
                className="w-full max-h-xl object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-baseline">
              <h2 className="mb-4 text-3xl md:text-4xl font-semibold text-[#1c1c1c]">
                About Us
              </h2>

              <p className="text-lg text-gray-600">
                Rumah Keong Batam mengubah limbah laut menjadi kerajinan tangan
                bernilai seni tinggi. Tak hanya memproduksi karya kreatif, Rumah
                Keong juga menjadi ruang edukasi dan pemberdayaan masyarakat
                melalui pelatihan kerajinan yang ramah
                lingkungan dan inspiratif.
              </p>
              <Link
                to="/store"
                className="inline-block px-6 py-2 border border-black text-black rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200 mt-6"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Alamat Section */}
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <section className="bg-[#fcf7ef] py-20 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6">
            {/* Kontak di kiri */}
            <div className="w-1/2 pr-8">
              <h2 className="text-4xl font-semibold text-[#1c1c1c] mb-4">
                Hubungi Kami
              </h2>
              <p className="text-gray-700 mb-3 leading-relaxed">
                Rumah Keong Experience Space
                <br />
                Jl. Hang Lekiu KM. 4, RT.03 / RW.02,
                <br />
                Kel. Sambau, Kec. Nongsa, Kota Batam,
                <br />
                Kepulauan Riau 29465, Indonesia
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Buka Jam:</strong>
                <br />
                Setiap Hari: 08.00 - 20.00
              </p>

              <div className="flex items-center space-x-4 mt-4">
                <a
                  href="https://wa.me/6281261558277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] text-3xl hover:opacity-80"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="https://www.instagram.com/rumah.keongbatam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E1306C] text-3xl hover:opacity-80"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Map di kanan */}
            <div className="w-full lg:w-1/2">
              <div className="w-full h-[28rem] rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1779103998365!2d104.05972658572038!3d1.026587359873086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d991006d516d71%3A0x31a32a8165fdfa51!2sRumah%20Keong!5e0!3m2!1sen!2sid!4v1753113160853!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </FadeContent>
    </div>
  );
};

export default Homepage;
