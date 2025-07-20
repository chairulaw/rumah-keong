import React from "react";

const dummyDetails = [
  {
    id: 1,
    produk_id: "PRD-001",
    quantity: 2,
    harga_satuan: 75000,
    sub_total: 150000,
  },
  {
    id: 2,
    produk_id: "PRD-002",
    quantity: 1,
    harga_satuan: 120000,
    sub_total: 120000,
  },
  {
    id: 3,
    produk_id: "PRD-003",
    quantity: 3,
    harga_satuan: 50000,
    sub_total: 150000,
  },
];

const TransactionDetail = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#f9f6f1] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-10">
          Transaction Details
        </h1>

        <div className="space-y-6">
          {dummyDetails.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
            >
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-medium text-gray-800">
                  Produk ID: {item.produk_id}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Harga Satuan:{" "}
                  <span className="font-medium">
                    Rp {item.harga_satuan.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="text-right text-gray-700">
                <p className="text-sm uppercase text-gray-400">Subtotal</p>
                <p className="text-xl font-semibold text-green-700">
                  Rp {item.sub_total.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransactionDetail;
