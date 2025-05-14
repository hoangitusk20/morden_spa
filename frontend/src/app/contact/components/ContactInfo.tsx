import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactInfo = () => {
  return (
    <div>
      <h2 className="font-display text-3xl mb-6">Get In Touch</h2>
      <p className="text-gray-600 mb-8">
        {
          "We'd love to hear from you. Reach out to us through any of the following methods or fill out the contact form."
        }
      </p>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-spa-gold/10 p-3 rounded-full mr-4">
            <MapPin className="h-6 w-6 text-spa-gold" />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Our Location</h4>
            <p className="text-gray-600">
              123 Bui Thi Lung, Hoc Mon Ho Chi Minh City
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-spa-gold/10 p-3 rounded-full mr-4">
            <Phone className="h-6 w-6 text-spa-gold" />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Phone</h4>
            <p className="text-gray-600">(+84) 389 530 320</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-spa-gold/10 p-3 rounded-full mr-4">
            <Mail className="h-6 w-6 text-spa-gold" />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Email</h4>
            <p className="text-gray-600">lexuanhoangx3@gmail.com</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-spa-gold/10 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-spa-gold" />
          </div>
          <div>
            <h4 className="font-medium text-lg mb-1">Opening Hours</h4>
            <p className="text-gray-600">Monday - Friday: 9am - 8pm</p>
            <p className="text-gray-600">Saturday - Sunday: 10am - 6pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
