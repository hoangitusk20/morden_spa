import Banner from "@/shared/Banner";
import React from "react";
import ContactInfo from "./components/ContactInfo";

import ContactForm from "./components/ContactForm";
import Map from "./components/Map";

export const metadata = {
  title: "Ngoc Spa - Contact Us",
  description:
    "Get in touch with us for any inquiries or to book your next spa experience.",
};

export default function ContactPage() {
  return (
    <div className="mt-20">
      <Banner
        title="Contact us"
        image="/images/ContactBanner.jpg"
        description="We're here to answer your questions and help you book your perfect spa experience"
      />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
          <Map />
        </div>
      </section>
    </div>
  );
}
