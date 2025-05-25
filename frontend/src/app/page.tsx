import { getServiceData } from "@/lib/getServiceData";
import AboutSection from "./Home/About";
import CoreFeature from "./Home/CoreFeature";
import CTA from "./Home/CTA";
import Hero from "./Home/Hero";
import Testimonials from "./Home/Testimonials";

export const metadata = {
  title: "Home - Ngoc Spa",
  description:
    "Home page of Ngoc Spa, your destination for relaxation and rejuvenation in Cu Chi, Ho Chi Minh City.",
};

const serviceData = await getServiceData();

export default function Home() {
  return (
    <div className="mt-20">
      <Hero />
      <CoreFeature services={serviceData} />
      <AboutSection />
      <CTA />
      <Testimonials />
    </div>
  );
}
