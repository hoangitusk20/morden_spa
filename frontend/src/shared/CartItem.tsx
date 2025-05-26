import React from "react";
import { Service } from "./type";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeService, updateService } from "@/store/slices/CartSlice";

const CartItem = ({ item }: { item: Service }) => {
  const dispatch = useDispatch();

  const increaseQty = (service: Service) => {
    const updatedService = {
      ...item,
      quantity: service.quantity ? service.quantity + 1 : 1,
    };
    dispatch(updateService(updatedService));
  };

  const decreaseQty = (service: Service) => {
    let updatedService = service;
    if (service.quantity && service.quantity > 1) {
      updatedService = {
        ...item,
        quantity: service.quantity - 1,
      };
    }
    dispatch(updateService(updatedService));
  };

  const removeItem = (id: string) => {
    dispatch(removeService(id));
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
              onClick={() => decreaseQty(item)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => increaseQty(item)}
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
          onClick={() => removeItem(item._id)}
          className="text-red-500 text-xs mt-2 hover:underline"
        >
          Xóa
        </button>
      </div>
    </li>
  );
};

export default CartItem;
