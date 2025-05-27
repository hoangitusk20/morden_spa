import { Button } from "@/components/ui/button";
import {
  getRelatedService,
  getServiceData,
  getServiceDetail,
} from "@/lib/getServiceData";
import ServiceCard from "@/shared/ServiceCard";
import { ArrowLeft, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const services = await getServiceData();

    return services.map((service: any) => ({
      id: service._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const service = await getServiceDetail(params.id);

  if (!service) {
    return {
      title: "Service not found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.title,
    description: service.description || service.detailDescription,
    openGraph: {
      title: service.title,
      description: service.description || service.detailDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const service = await getServiceDetail((await params).id);
  if (!service) {
    return <div>Service not found</div>;
  }
  const relatedServices = await getRelatedService((await params).id);

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
                {relatedServices.map((relatedService) => (
                  <ServiceCard
                    key={relatedService._id}
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
