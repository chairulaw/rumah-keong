import React from "react";
import { Link } from "react-router-dom";
import { aboutImg, aboutImg2 } from "../assets/Assets";
import FadeContent from "../hooks/FadeContent";

const About = () => {
  return (
    <div>
      <section className="py-20 px-6 md:px-12 lg:px-20">
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
                Apa itu Rumah Keong?
              </h2>

              <p className="text-lg text-gray-600">
                Rumah Keong Batam adalah sebuah inisiatif kreatif yang
                mengangkat nilai limbah laut menjadi produk seni bernilai
                tinggi. Berfokus pada pemanfaatan cangkang keong dan limbah laut
                lainnya, Rumah Keong menghadirkan berbagai kerajinan tangan unik
                seperti bunga hias, suvenir, dan dekorasi yang tidak hanya
                indah, tetapi juga ramah lingkungan.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Selain memproduksi karya, Rumah Keong juga aktif memberikan
                pelatihan kerajinan kepada masyarakat, pelajar, dan komunitas.
                Tujuannya adalah mendorong pemberdayaan ekonomi lokal,
                meningkatkan kesadaran lingkungan, serta menumbuhkan jiwa
                kreatif di tengah masyarakat. Melalui kegiatan edukatif ini,
                Rumah Keong ingin menunjukkan bahwa limbah bukan akhir dari
                sebuah nilai, melainkan awal dari sebuah karya.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Dengan semangat inovasi dan keberlanjutan, Rumah Keong Batam
                terus berkembang sebagai rumah bagi kreativitas, pelestarian
                lingkungan, dan pemberdayaan masyarakat berbasis
                seni dan budaya.
              </p>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* posisi kebalik */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <FadeContent>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Teks di kiri */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-baseline">
              <h2 className="mb-4 text-3xl md:text-4xl font-semibold text-[#1c1c1c]">
                Website Rumah Keong
              </h2>
              <p className="text-lg text-gray-600">
                Kami adalah rumah kreativitas yang berdedikasi untuk mengubah
                limbah laut—terutama cangkang keong—menjadi kerajinan tangan
                yang indah dan bernilai tinggi. Melalui proses daur ulang yang
                inovatif dan sentuhan seni yang teliti, setiap produk yang kami
                hasilkan membawa pesan cinta terhadap lingkungan dan semangat
                pemberdayaan masyarakat.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Website ini hadir sebagai jendela untuk mengenal lebih dalam
                karya-karya kami, mengikuti berbagai kegiatan pelatihan, serta
                menjelajahi produk unik yang bisa Anda bawa pulang sebagai
                hiasan, suvenir, atau hadiah bermakna. Tak hanya itu, kami juga
                membuka ruang kolaborasi dengan komunitas, sekolah, dan
                institusi yang ingin belajar dan berkontribusi dalam gerakan
                daur ulang kreatif.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Website ini hadir sebagai jendela untuk mengenal lebih dalam
                karya-karya kami, mengikuti berbagai kegiatan pelatihan, serta
                menjelajahi produk unik yang bisa Anda bawa pulang sebagai
                hiasan, suvenir, atau hadiah bermakna. Tak hanya itu, kami juga
                membuka ruang kolaborasi dengan komunitas, sekolah, dan
                institusi yang ingin belajar dan berkontribusi dalam gerakan
                daur ulang kreatif.
              </p>
              <Link
                to="/store-pages"
                className="inline-block px-6 py-2 border border-black text-black rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200 mt-6"
              >
                Belanja Sekarang
              </Link>
            </div>
            {/* Gambar di kanan */}
            <div className="w-full md:w-1/3 ml-50">
              <img
                src={aboutImg2}
                alt="About Us"
                className="w-full max-h-sm object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </FadeContent>
      </section>
    </div>
  );
};

export default About;
