"use client"; // Nếu bạn dùng App Router, Navbar cần là component client

import { usePathname } from "next/navigation";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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
          <ShoppingCart className="mx-6" />
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
          absolute w-full top-20 right-0 bg-white shadow-lg rounded-lg p-4 z-10
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
    </header>
  );
};

export default Navbar;
