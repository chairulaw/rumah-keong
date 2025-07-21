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

      {/* Featured Product Section */}

      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <section className="bg-[#fcf7ef] py-20 px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1c1c1c]">
              Product Unggulan
            </h2>
            <button className="border border-[#1c1c1c] px-4 py-2 rounded-full hover:bg-[#1c1c1c] hover:text-white transition">
              Lihat Semua Toko
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
            {products.map((product, index) => (
              <div
                key={index}
                className="text-center rounded-4xl relative group cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-contain mx-auto mb-4 transition-transform group-hover:scale-105 duration-300"
                />
                <h3 className="text-lg font-medium text-[#1c1c1c]">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeContent>

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
    </div>
  );
};

export default Homepage;
