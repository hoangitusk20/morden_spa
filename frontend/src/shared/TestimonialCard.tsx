"use client";
import React, { useRef } from "react";
import { Star } from "lucide-react";
import { TestimonialProps } from "./Mockdata/Testimonials";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  image,
  rating,
  text,
  service,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl"
    >
      <div className="flex items-center mb-4">
        <div className=" rounded-full overflow-hidden mr-4">
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h3 className="font-medium text-spa-charcoal">{name}</h3>
          <p className="text-sm text-gray-500">{service}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < rating ? "text-primary fill-primary" : "text-gray-300"
            }
          />
        ))}
      </div>

      <p className="text-gray-600 italic">{text}</p>
    </motion.div>
  );
};

export default TestimonialCard;
