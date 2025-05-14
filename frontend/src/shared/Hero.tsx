import React from "react";

type HeroProps = {
  title: string;
  description: string;
  image: string;
};

const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <div
      className={`bg-[url('/images/AboutHero.jpg')] bg-cover bg-center h-[400px] w-full relative`}
    >
      <div className="absolute top-0 w-full h-full bg-black/40 z-1 flex flex-col justify-center items-center ">
        <h1 className="text-white text-5xl font-serif font-semibold text-center my-4">
          {title}
        </h1>
        <div className="w-[200px]  border-4 border-primary"></div>
        <p className="text-white text-lg pt-4">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
