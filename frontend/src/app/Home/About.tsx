"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <section className="py-20 bg-spa-sand/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Side */}
          <div className="relative">
            <Image
              src="/images/about1.avif"
              alt="Spa interior"
              width={800}
              height={600}
              priority
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-64 h-48">
              <Image
                src="/images/about2.avif"
                alt="Spa treatment"
                fill
                sizes={"400px"}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Welcome to Serenty Spa
            </h2>
            <div className="w-16 h-1 bg-spa-gold mb-6"></div>
            <p className="text-gray-700 mb-6">
              Born from the humble dreams of a small-town girl from Huế,
              Serenity Spa began as a quiet vision—one rooted in tradition,
              healing, and heart. After moving to Saigon in search of
              opportunity, our founder carried with her the gentle wisdom of
              Central Vietnam and a deep belief in the power of mindful care.
            </p>
            <p className="text-gray-700 mb-6">
              At Serenity Spa, we blend time-honored Vietnamese wellness rituals
              with modern techniques to create an experience that soothes both
              body and soul. Each treatment is a tribute to our
              roots—thoughtfully crafted to restore balance, calm, and inner
              glow.
            </p>
            <p className="text-gray-700 mb-8">
              We use hand-selected, natural ingredients and approach every guest
              with the warmth of home. Here, every detail whispers tranquility.
            </p>
            <Link href="/about">
              <Button className="bg-primary hover:bg-opacity-90 text-white rounded-full px-8 hover:cursor-pointer hover:brightness-105">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
