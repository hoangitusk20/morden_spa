// components/ServiceCard.tsx
import React from "react";
import { Service } from "../shared/type"; // Đường dẫn có thể tuỳ theo project
import Image from "next/image";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Image src={service.image} alt={service.title} />
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-semibold">{service.title}</h2>
          <span className="text-emerald-500 font-bold">${service.price}</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">🕒 {service.duration} min</p>
        <p className="text-gray-700 text-sm mb-4">{service.description}</p>

        <div className="flex justify-between items-center">
          <a href="#" className="text-emerald-600 font-medium hover:underline">
            View Details
          </a>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded text-sm">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
