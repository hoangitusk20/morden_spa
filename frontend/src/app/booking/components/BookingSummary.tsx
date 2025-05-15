"use client";
import CartItem from "@/shared/CartItem";
import { Service } from "@/shared/type";
import React, { useEffect, useState } from "react";

const BookingSummary = () => {
  const [cart, setCart] = useState<Service[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Lỗi khi parse cart từ localStorage:", error);
      }
    }
  }, []);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  return (
    <div className="w-full mx-auto p-6 bg-white]">
      <h1 className="text-4xl font-serif text-[#3c2415] mb-8">
        Booking Summary
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="">
          <ul>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4 mb-4">
            <h2 className="text-xl font-bold">Total Price:</h2>
            <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          <p className="text-gray-600">Payment will be collected at the spa</p>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
