import React from "react";

const Checkout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f9f6f1] overflow-y-auto py-10">

      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mb-5">
        <h1 className=" text-black font-semibold mb-4">Your Account</h1>
        <p className="text-gray-600">remainsguy@gmail.com</p>
      </div>

      {/* delivery */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md">
        <h1 className=" text-black font-semibold mb-4">Delivery</h1>

        <div className="border border-gray-300 rounded mb-4">
          <h2 className="text-xs font-semibold text-gray-500 px-4 pt-4 pb-2 uppercase tracking-wider">
            Delivery Options
          </h2>
          <div className="divide-y divide-gray-200">
            {/* Option 1 */}
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value="local"
                  className="accent-black"
                  defaultChecked
                />
                <span className="text-sm text-black font-medium">
                  Local delivery (3 - 5 Working Days)
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                IDR 50.000
              </span>
            </label>
            {/* Option 2 */}
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value="specific"
                  className="accent-black"
                />
                <span className="text-sm text-black font-medium">
                  Specific Date Delivery
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                IDR 50.000
              </span>
            </label>
            {/* Option 3 */}
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value="furniture"
                  className="accent-black"
                />
                <span className="text-sm text-black font-medium">
                  Furniture Delivery
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                IDR 50.000
              </span>
            </label>
            {/* Option 4 */}
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    className="accent-black"
                  />
                  <span className="text-sm text-black font-medium">
                    Store Pickup
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-7">
                  Self Collection
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-700">
                  FREE
                </span>
              </div>
            </label>
          </div>
        </div>

        <h1 className="text-black font-semibold mb-4">Shipping Address</h1>
        <form className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                placeholder="First Name"
                className="w-full bg-gray-100 border-none py-3 px-3"
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                placeholder="Last Name"
                className="w-full bg-gray-100 border-none py-3 px-3"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
              Address
            </label>
            <input
              type="text"
              placeholder="Address 1"
              className="w-full bg-gray-100 border-none py-3 px-3 mb-3"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-gray-100 border-none py-3 px-3"
            />
          </div>
        </form>
        <div className=" mt-4">
          <button className="bg-black w-full text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-200">
            Continue
          </button>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white p-8 border border-gray-300 w-full max-w-md mt-5">
        <h1 className="text-black font-semibold mb-4">Payment</h1>

    <div className="border border-gray-300 rounded mb-4">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="payment"
          value="cash"
          className="accent-black"
        />
        <span className="text-sm text-black font-medium">Cash on Delivery</span>
      </div>
      <span className="text-sm font-semibold text-gray-700">IDR 50.000</span>
    </div>
      </div>
    </div>
  );
};

export default Checkout;
