// components/ServiceCard.tsx
import React from "react";
import { Service } from "./type";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group w-full rounded-lg shadow-md hover:shadow-xl overflow-hidden bg-white">
      <div className="relative h-64 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-sm">
          {service.duration + " min"}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="font-serif text-lg font-medium line-clamp-1 overflow-hidden text-ellipsis">
            {service.title}
          </h2>
          <span className="text-primary font-medium text-lg">
            ${service.price}
          </span>
        </div>
        <p className="py-4 text-md text-gray-600 line-clamp-3 h-[5.5rem] overflow-hidden text-ellipsis">
          {service.description}
        </p>
        <div className="flex justify-between items-center">
          <Link
            href={`/services/${service.id}`}
            className="py-2 mt-2 px-4 hover:border-b-2  hover:text-primary rounded-lg flex md:inline-flex justify-center md:justify-start"
          >
            <span className="mr-2">Learn more</span>
            <ArrowRight className="group-hover:ml-2  " />
          </Link>

          <AddToCartButton service={service} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
