import AboutSection from "./Home/About";
import CoreFeature from "./Home/CoreFeature";
import Hero from "./Home/Hero";

export default function Home() {
  return (
    <div className="mt-20">
      <Hero />
      <CoreFeature />
      <AboutSection />
    </div>
  );
}
