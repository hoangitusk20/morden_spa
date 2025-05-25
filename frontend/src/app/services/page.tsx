import Banner from "@/shared/Banner";
import ServiceList from "./components/ServiceList";
import { getServiceData } from "@/lib/getServiceData";

const serviceData = await getServiceData();
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
