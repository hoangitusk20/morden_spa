import React from "react";

const Hero = () => {
  return (
    <div className="bg-[url('/images/AboutHero.jpg')] bg-cover bg-center h-[400px] w-full relative">
      <div className="absolute top-0 w-full h-full bg-black/40 z-1 flex flex-col justify-center items-center ">
        <h1 className="text-white text-5xl font-serif font-semibold text-center my-4">
          About Serenty Spa
        </h1>
        <div className="w-[200px]  border-4 border-primary"></div>
        <p className="text-white text-lg pt-4">
          Discover the story behind our commitment to wellness and exceptional
          spa experiences.
        </p>
      </div>
    </div>
  );
};

export default Hero;
