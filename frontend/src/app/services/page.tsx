import Banner from "@/shared/Banner";
import ServiceList from "./components/ServiceList";
import { getServiceData } from "@/lib/getServiceData";

export const metadata = {
  title: "Ngoc Spa - Our Services",
  description:
    "Explore our luxurious treatments designed to rejuvenate your body and mind.",
};
export default async function ServicePage() {
  console.log("🔥 Rendering Service Page", new Date().toISOString());

  const serviceData = await getServiceData();
  return (
    <div className="mt-20">
      <Banner
        title="Our Services"
        image="/images/ServiceBanner.webp"
        description="Discover our comprehensive range of luxurious treatments designed to nurture your body, mind, and spirit."
      />

      <ServiceList services={serviceData} />
    </div>
  );
}
