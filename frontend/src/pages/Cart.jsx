import React from "react";
import { Link } from "react-router-dom";
import { heroImg } from "../assets/assets";

const cartItems = [
  {
    id: 1,
    name: "Cascading Hawthorn Bonsai (Japan)",
    price: 108.0,
    qty: 1,
    image: heroImg,
  },
  {
    id: 2,
    name: "Isozansho Bonsai",
    price: 158.0,
    qty: 2,
    image: heroImg,
  },
];

const Cart = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#f9f6f1] py-16 px-4 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-8 text-center">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <ul className="w-full flex flex-col items-center">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-8 border-b py-4 last:border-b-0 w-3/4 justify-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 text-center">
                    <div className="font-medium text-lg">{item.name}</div>
                    <div className="text-gray-500 text-sm">
                      Qty: {item.qty}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      SGD {item.price.toFixed(2)}
                    </div>
                    <button className="text-xs text-red-500 hover:underline mt-2">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-8 w-3/4">
              <div className="text-lg font-semibold">Total</div>
              <div className="text-xl font-bold">SGD {total.toFixed(2)}</div>
            </div>
            <div className="mt-8 flex justify-center w-3/4">
              <Link
                to="/checkout"
                className="px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200 w-full text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;