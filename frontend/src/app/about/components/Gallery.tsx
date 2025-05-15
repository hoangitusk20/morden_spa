import { getGalleryImages } from "@/lib/GetGalleryImage";
import Image from "next/image";
import React from "react";

const Gallery = () => {
  const images = getGalleryImages();
  return (
    <div className="container-custom py-15">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-serif tracking-wider text-3xl mt-2 mb-4">
          Spa Gallery
        </h2>
        <p className="text-muted-foreground mb-15">
          Take a virtual tour of our beautifully designed spa, where every
          detail has been carefully considered to create a tranquil atmosphere.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`Gallery Image ${i + 1}`}
              fill
              className="object-cover  transition duration-500 transform hover:scale-110 hover:z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
