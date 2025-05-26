"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.avif"
        alt="Best spa in Hoc Mon"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 z-11 flex flex-col items-center justify-center px-5 text-center"
      >
        <h2 className="text-5xl font-bold text-white/90 font-serif mb-4 text-shadow md:text-6xl">
          Discover True Relaxation
        </h2>
        <h3 className="text-lg text-white/90 tracking-tighter mt-4 lg:w-[50vw] mb-8">
          Top wonderful Spa in Cu Chi, Ho Chi Minh City. Indulge in a world of
          relaxation, rejuvenation, and self-care with our premium spa
          treatments designed for your wellbeing.
        </h3>
        <Link
          href="/contact"
          className="md:px-8 px-5 py-3 bg-primary text-white text-sm rounded-md z-12"
        >
          Book Your Experience
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
