import { Button } from "@/components/ui/button";
import services from "@/shared/Mockdata/Services";
import ServiceCard from "@/shared/ServiceCard";
import { ArrowLeft, Clock, DollarSign, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = params;
  const service = services.find((service) => service.id === id);
  if (!service) {
    return <div>Service not found</div>;
  }
  const relatedServices = services.filter(
    (s) => s.category === service.category && s.id !== service.id
  );
  const relatedServicesCount =
    relatedServices.length > 4 ? 4 : relatedServices.length;
  const relatedServicesToShow = relatedServices.slice(0, relatedServicesCount);
  return (
    <div className="mt-20">
      <div className="pt-15 pb-20 bg-white">
        <div className="container-custom mx-auto px-4">
          <Link
            className="text-primary bg-white border-1 border-primary hover:brightness-105 rounded-lg px-4 py-2 mb-8 inline-flex items-center"
            href={"/services"}
            prefetch={false}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 ">
            <div className="overflow-hidden rounded-lg relative h-100">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="cover"
              />
            </div>

            <div className="">
              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                {service.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center text-gray-700">
                  <Clock className="mr-2 text-spa-teal" size={18} />
                  {service.duration}
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="mr-2 text-spa-teal" size={18} />
                  {service.price}
                </div>
              </div>

              <p className="text-gray-700 mb-8">{service.detailDescription}</p>
              <Button className="hover:brightness-105">
                <ShoppingBag className="mr-2" size={16} />
                Add to Cart - ${service.price}
              </Button>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-2xl font-medium mb-6">
                You Might Also Like
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedServicesToShow.map((relatedService) => (
                  <ServiceCard
                    key={relatedService.id}
                    service={relatedService}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
