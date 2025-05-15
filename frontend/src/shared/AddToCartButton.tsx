"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";
import { Service } from "./type";
import { ShoppingBag } from "lucide-react";

const AddToCartButton = ({ service }: { service: Service }) => {
  const addServiceToCart = (newService: Service) => {
    try {
      const stored = localStorage.getItem("cart");
      const cart: Service[] = stored ? JSON.parse(stored) : [];

      const existingService = cart.find((item) => item.id === newService.id);

      if (existingService) {
        existingService.quantity = (existingService.quantity || 1) + 1;
        toast.success(`Increate ${newService.title} quantity in cart`);
      } else {
        cart.push({ ...newService, quantity: 1 });
        toast.success(`Added ${newService.title} to cart`);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      toast.error("Failed to add service to cart");
      console.error(error);
    }
  };
  return (
    <Button className="mt-3" onClick={() => addServiceToCart(service)}>
      <ShoppingBag className="mr-2 " />
      Add
    </Button>
  );
};

export default AddToCartButton;
