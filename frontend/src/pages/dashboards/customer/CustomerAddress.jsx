import React from "react";

const CustomerAddress = () => {

    

  return (
    <div className="flex justify-center">
      <button className="relative py-2 px-4 rounded overflow-hidden group">
        <span className="relative z-10 text-md font-semibold">
          Tambah Alamat Baru
        </span>
        <span
          className="absolute left-1/2 bottom-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full w-0"
          style={{ transform: "translateX(-50%)" }}
        ></span>
      </button>
    </div>
  );
};

export default CustomerAddress;
