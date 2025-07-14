import React from "react";
import { Link } from "react-router-dom";
import { aboutImg, aboutImg2 } from "../assets/assets";
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
                Welcome to our online store! We are a passionate team dedicated
                to providing you with a delightful shopping experience. Our
                mission is to curate a diverse selection of high-quality
                products that will make your life easier and more enjoyable.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                At our store, we believe in the power of personalization and
                customization. Whether you're looking for a special gift or an
                item to add to your collection, we have something for everyone.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Our user-friendly interface and secure payment system ensure a
                smooth and hassle-free shopping journey for you. We value your
                feedback and suggestions, and we're always open to new ideas and
                innovations.
              </p>
              <Link
                to="/store-pages"
                className="inline-block px-6 py-2 border border-black text-black rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200 mt-6"
              >
                Shop Now
              </Link>
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
              <p className="text-lg text-gray-600">
                Welcome to our online store! We are a passionate team dedicated
                to providing you with a delightful shopping experience. Our
                mission is to curate a diverse selection of high-quality
                products that will make your life easier and more enjoyable.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                At our store, we believe in the power of personalization and
                customization. Whether you're looking for a special gift or an
                item to add to your collection, we have something for everyone.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Our user-friendly interface and secure payment system ensure a
                smooth and hassle-free shopping journey for you. We value your
                feedback and suggestions, and we're always open to new ideas and
                innovations.
              </p>
              <Link
                to="/store-pages"
                className="inline-block px-6 py-2 border border-black text-black rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200 mt-6"
              >
                Shop Now
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
