import React from "react";
import Hero from "../../shared/Hero";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import Video from "./components/Video";
import OurValues from "./components/OurValues";

export default function AboutPage() {
  return (
    <div className="mt-20">
      <Hero
        title="About Serenty Spa"
        image="/images/AboutHero.jpg"
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
