import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const ContactForm = () => {
  return (
    <div>
      <Card className="p-6 shadow-lg">
        <h3 className="font-display text-2xl mb-6">Send Us a Message</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-1 block">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium mb-1 block">
                Email
              </label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium mb-1 block">
              Phone
            </label>
            <Input id="phone" placeholder="Your phone number" />
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium mb-1 block">
              Subject
            </label>
            <Input id="subject" placeholder="Message subject" />
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
          <Button className="w-full hover:brightness-105 ">Send Message</Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
