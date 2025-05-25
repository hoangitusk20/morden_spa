"use client";
import React, { useRef } from "react";
import ServiceCard from "@/shared/ServiceCard";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Service } from "@/shared/type";

interface CoreFeatureProps {
  services: Service[];
}

const CoreFeature: React.FC<CoreFeatureProps> = ({ services }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });

  return (
    <div className="bg-gray-100 py-20">
      <div className="container-custom mx-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl text-gray-800 text-center font-serif mb-5">
          Our Signature Treatments
        </h1>
        <p className="text-center text-md w-[80vw] mx-auto md:w-[60vw] lg:w-[40vw]">
          Indulge in our carefully curated treatments designed to provide the
          ultimate relaxation and rejuvenation experience.
        </p>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16"
        >
          {services.slice(0, 4).map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))}
        </motion.div>
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="px-8 py-2 bg-primary text-white rounded-2xl text-md inline-block mx-auto hover:brightness-105"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoreFeature;
