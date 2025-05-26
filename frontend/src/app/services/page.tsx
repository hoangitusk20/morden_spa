import Banner from "@/shared/Banner";
import ServiceList from "./components/ServiceList";
import { getServiceData } from "@/lib/getServiceData";

const serviceData = await getServiceData();

export const metadata = {
  title: "Ngoc Spa - Our Services",
  description:
    "Explore our luxurious treatments designed to rejuvenate your body and mind.",
};
export default function ServicePage() {
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
