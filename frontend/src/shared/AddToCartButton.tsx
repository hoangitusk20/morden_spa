"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";
import { Service } from "./type";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addService } from "@/store/slices/CartSlice";

const AddToCartButton = ({ service }: { service: Service }) => {
  const dispatch = useDispatch();

  const addServiceToCart = (newService: Service) => {
    try {
      dispatch(addService(newService));
      toast.success("Service added to cart");
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
