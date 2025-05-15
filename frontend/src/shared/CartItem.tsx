import React from "react";
import { Service } from "./type";
import Image from "next/image";

const CartItem = ({
  cart,
  setCart,
  item,
}: {
  cart: Service[];
  setCart: (value: Service[]) => void;
  item: Service;
}) => {
  const updateCart = (updatedCart: Service[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id && item.quantity
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id && item.quantity
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  return (
    <li className="flex justify-between items-center py-3 border-b">
      <div className="flex items-center">
        <Image
          width={100}
          height={100}
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded mr-5"
        />
        <div className="flex-col justify-start">
          <p>{item.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => decreaseQty(item.id)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => increaseQty(item.id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">
          ${item.quantity && item.price * item.quantity}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 text-xs mt-2 hover:underline"
        >
          Xóa
        </button>
      </div>
    </li>
  );
};

export default CartItem;
