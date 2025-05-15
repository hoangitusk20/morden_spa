"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    id: 1,
    title: "Quality",
    description:
      "We use only premium products and the most effective techniques, constantly updating our offerings to provide the best results.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-spa-gold"
      >
        <path d="m12 15 2 2 4-4"></path>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Personalization",
    description:
      "We believe that every client is unique, so we tailor our treatments and products to address individual needs and preferences.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-spa-gold"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Sustainability",
    description:
      "We are committed to environmentally friendly practices, from our eco-conscious products to our energy-efficient facility.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-spa-gold"
      >
        <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"></path>
        <path d="M12 2v10l4.24 4.24"></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Integrity",
    description:
      "We operate with honesty and transparency, ensuring that our clients always receive the value they expect from our services.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-spa-gold"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
];

const OurValues = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="section-padding bg-spa-lavender/10 bg-gray-50 py-15">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif tracking-wider text-3xl mt-2 mb-4">
            Core Values
          </h2>
          <p className="text-muted-foreground mb-15">
            These values shape every aspect of our business, from the products
            we select to the way we interact with our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-md shadow-lg p-6 bg-white"
              key={value.id}
            >
              <div className="text-primary mb-4">{value.icon}</div>
              <h3 className="text-xl font-serif font-medium mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 text-md">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
