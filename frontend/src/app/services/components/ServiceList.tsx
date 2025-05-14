"use client";
import React, { useMemo, useState } from "react";
import { Service } from "@/shared/type";
import ServiceCard from "@/shared/ServiceCard";
import { Button } from "@/components/ui/button";

type ServiceListProps = {
  services: Service[];
};

const ServiceList = ({ services }: ServiceListProps) => {
  const categories = ["All", "Massage", "Facial", "Body", "Hair", "Nails"];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const limit = 8; // số service mỗi trang

  const fetchServices = async (page: number) => {
    setTotalPages(totalPages);
    setCurrentPage(page);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchServices(page);
  };

  const filteredAndSortedServices = useMemo(() => {
    // Filter by category
    const filtered =
      activeCategory === "All"
        ? services
        : services.filter((service) => service.category === activeCategory);

    // Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "priceLowHigh") {
        return a.price - b.price;
      }
      if (sortBy === "priceHighLow") {
        return b.price - a.price;
      }
      if (sortBy === "durationShortLong") {
        return a.duration - b.duration;
      }
      if (sortBy === "durationLongShort") {
        return b.duration - a.duration;
      }
      // Default - no sorting
      return 0;
    });
  }, [activeCategory, sortBy]);

  return (
    <div className="py-15 container-custom ">
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
                activeCategory === category
                  ? ""
                  : "bg-white text-primary  hover:bg-green-100"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-spa-purple text-gray-700"
          >
            <option value="default">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="durationShortLong">Duration: Short to Long</option>
            <option value="durationLongShort">Duration: Long to Short</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAndSortedServices.length > 0 ? (
          filteredAndSortedServices.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))
        ) : (
          <div className="">No Service Found!</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? ""
                  : "bg-white border-1 border-primary text-primary"
              }`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
