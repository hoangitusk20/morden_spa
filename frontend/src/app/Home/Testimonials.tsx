import React from "react";
import { testimonials } from "@/shared/Mockdata/Testimonials";
import TestimonialCard from "@/shared/TestimonialCard";

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-5xl my-3 font-serif">What Our Clients Say</h2>
          <p className="text-lg ">Real experiences from our valued guests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
