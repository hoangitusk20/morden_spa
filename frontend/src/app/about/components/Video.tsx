"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Video = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="section-padding bg-gray-100 py-15">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="uppercase text-gray-400 text-md">
            See It In Action
          </span>
          <h2 className="text-3xl mt-2 mb-4 font-medium font-serif">
            Video Tour
          </h2>
          <p className="text-muted-foreground">
            Experience the ambiance and offerings of Serene Beauty Spa through
            our virtual tour video.
          </p>
        </motion.div>

        <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/pjm2aXT3A2M?si=1JtUY2_laBUsE5Eb"
            title="Serene Spa Tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
