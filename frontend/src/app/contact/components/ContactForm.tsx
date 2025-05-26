"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEBFORM_KEY?.toString() || "No api key"
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        form.reset(); // clear fields
        toast.success("Message sent successfully!");
      } else {
        console.error("Submission error:", data);
        toast.error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div>
      <Card className="p-6 shadow-lg">
        <h3 className="font-display text-2xl mb-6">Send Us a Message</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-1 block">
                Name
              </label>
              <Input id="name" name="name" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium mb-1 block">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium mb-1 block">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="Your phone number"
              type="tel"
            />
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium mb-1 block">
              Subject
            </label>
            <Input id="subject" name="subject" placeholder="Message subject" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium mb-1 block">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              rows={5}
              className="w-full outline-1 rounded-md p-2"
            />
          </div>
          <Button type="submit" className="w-full hover:brightness-105 ">
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
