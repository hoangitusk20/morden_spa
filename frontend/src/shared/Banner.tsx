import React from "react";

type BannerProps = {
  title: string;
  description: string;
  image: string;
};

const Banner = ({ title, description, image }: BannerProps) => {
  return (
    <div
      className="bg-cover bg-center h-[400px] w-full relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute top-0 w-full h-full bg-black/50 z-1 flex flex-col justify-center items-center ">
        <h1 className="text-white text-5xl font-serif font-semibold text-center my-4">
          {title}
        </h1>
        <div className="w-[200px]  border-4 border-primary"></div>
        <p className="text-white text-lg pt-4">{description}</p>
      </div>
    </div>
  );
};

export default Banner;
