import AboutSection from "./Home/About";
import CoreFeature from "./Home/CoreFeature";
import CTA from "./Home/CTA";
import Hero from "./Home/Hero";
import Testimonials from "./Home/Testimonials";

export default function Home() {
  return (
    <div className="mt-20">
      <Hero />
      <CoreFeature />
      <AboutSection />
      <CTA />
      <Testimonials />
    </div>
  );
}
