"use client"; // Nếu bạn dùng App Router, Navbar cần là component client

import { usePathname } from "next/navigation";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const pathname = usePathname();

  return (
    <header className="bg-white/95 h-20 fixed top-0 left-0 right-0 z-20 shadow-md">
      <div className="container-custom mx-auto flex justify-between items-center h-full ">
        <h2 className="text-2xl text-primary font-bold text-center mx-5">
          Serenty Spa
        </h2>

        <div className="">
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

        <div className="flex items-center">
          <ShoppingCart className="mx-3" />
          <Button className="mx-3">Book now</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
