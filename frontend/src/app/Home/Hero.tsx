"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-[url('/images/hero.avif')] bg-cover bg-center h-[90vh] w-full relative">
      <div className="absolute top-0 w-full h-full bg-black/50 z-1">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center h-full container-custom mx-auto px-5 "
        >
          <h2 className="text-5xl font-bold text-white font-serif mb-4 text-shadow md:font-6xl ">
            {" "}
            Discover True Relaxation
          </h2>
          <p className="text-lg text-white text-center tracking-tighter mt-4 lg:w-[50vw] mb-8">
            Indulge in a world of relaxation, rejuvenation, and self-care with
            our premium spa treatments designed for your wellbeing.
          </p>
          <Link
            href={"contact"}
            className="md:px-8 py-3 bg-primary text-white text-sm rounded-md"
          >
            Book Your Experience
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
