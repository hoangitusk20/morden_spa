"use client";

import { usePathname } from "next/navigation";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Cart = dynamic(() => import("./Cart"), { ssr: false });

const Navbar = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <header className="bg-white/95 h-20 fixed top-0 left-0 right-0 z-20 shadow-md">
      <div className="container-custom mx-auto flex justify-between items-center h-full ">
        <Link
          className="text-2xl text-primary font-bold text-center mx-5"
          href="/"
        >
          Serenty Spa
        </Link>

        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`mx-3 hover:underline ${
                pathname == link.href ? "text-primary font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingCart className="mx-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 right-3 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </button>
          {/* <Button className="mx-3">Book now</Button> */}

          {/* Show menu on mobile */}
          <div className="md:hidden">
            <button
              className="p-0  bg-white hover:bg-white"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <Menu className="absolute top-0.5" />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`
          absolute w-full top-20 right-0 bg-white shadow-lg rounded-b-lg p-4 z-10
          transition-all duration-300 ease-in-out
          transform ${
            isOpenMenu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`block px-4 py-2 hover:bg-gray-100 ${
                pathname == link.href ? "text-primary font-semibold" : ""
              }`}
              onClick={() => setIsOpenMenu(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        {/* Cart component */}
        <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </header>
  );
};

export default Navbar;
