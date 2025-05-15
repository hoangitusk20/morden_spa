"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <section className="section-padding bg-primary text-white py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container-custom"
      >
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-5xl font-medium font-serif mb-4">
            Transform Your Experience
          </h2>
          <p className="paragraph text-white/90 mb-8 text-lg">
            Book your appointment today and immerse yourself in a world of
            relaxation and rejuvenation. Let our expert therapists help you look
            and feel your best.
          </p>
          <Link href="/contact">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary py-2 hover:bg-gray-100"
            >
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
