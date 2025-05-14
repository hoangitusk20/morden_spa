import React from "react";
import { Service } from "@/shared/type";
import ServiceCard from "@/shared/ServiceCard";

type ServiceListProps = {
  services: Service[];
};

const ServiceList = ({ services }: ServiceListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </div>
  );
};

export default ServiceList;
