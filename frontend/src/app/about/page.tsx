import React from "react";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import Video from "./components/Video";
import OurValues from "./components/OurValues";
import Banner from "../../shared/Banner";

export default function AboutPage() {
  return (
    <div className="mt-20">
      <Banner
        title="About Serenty Spa"
        image="/images/AboutBanner.jpg"
        description="Discover the story behind our commitment to wellness and exceptional
          spa experiences."
      />
      <Story />

      <OurValues />

      <Gallery />

      <Video />
    </div>
  );
}
