"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
const GalleryImage = ({ src, index }: { src: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg"
    >
      <Image
        src={src}
        alt={`Gallery Image ${index + 1}`}
        fill
        className="object-cover  transition duration-500 transform hover:scale-110 hover:z-10"
      />
    </motion.div>
  );
};

export default GalleryImage;
