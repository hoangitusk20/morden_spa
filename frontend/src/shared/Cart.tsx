"use client";
import { X } from "lucide-react";

import Link from "next/link";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
const Cart = ({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}) => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div
      className={`overflow-y-scroll fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
        isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className={`absolute right-0 top-0 w-80 md:w-100 min-h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute top-4 right-4"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-center mt-4 text-gray-800">
          Your Cart
        </h2>
        <div className="p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <div>
              <ul>
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </ul>
              <Link
                href="/booking"
                className="text-center py-2 bg-primary text-white mt-5 w-full block rounded-lg hover:brightness-105"
                onClick={() => setIsCartOpen(false)}
              >
                Book Services
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
