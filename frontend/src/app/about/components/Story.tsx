import Image from "next/image";
import React from "react";

const Story = () => {
  return (
    <div className="container-custom py-15 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-10 gap-16 font-serif tracking-wider text-justify">
        <div className="">
          <h2 className="text-3xl mb-4">Beauty & Wellness for Everyone</h2>
          <p className="mb-2">
            Founded in 2015 by a small-town dreamer from Huế, Serenity Spa began
            as a quiet vision rooted in tradition, healing, and heartfelt care.
          </p>
          <p className="mb-2">
            After moving to Saigon in search of opportunity, our founder carried
            with her the gentle wisdom of Central Vietnam—steeped in ancient
            herbal remedies, mindful touch, and the belief that true wellness
            begins with the soul
          </p>

          <p className="mb-2">
            She started with just one room, a few bottles of homemade oils, and
            a deep desire to help others feel seen, soothed, and restored. Word
            spread quickly—not just about the quality of the treatments, but the
            warmth and sincerity behind every service.
          </p>
          <p className="mb-2">
            As Serenity Spa has grown, welcoming guests from all walks of life,
            our mission has remained the same: to create meaningful wellness
            experiences that honor our roots while embracing modern care.
          </p>

          <p className="">
            Today, Serenity Spa is proud to be a trusted space for healing—led
            by a passionate team of therapists who continue the founder’s vision
            of bringing comfort, balance, and inner calm to every guest who
            walks through our doors.
          </p>
        </div>
        {/* Image */}
        <div className="relative ">
          <div className="relative w-full h-[90%]">
            <Image
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2340&auto=format&fit=crop"
              alt="Spa Introduce"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
          <div className="absolute bottom-[5%] -left-8 bg-spa-gold/10 backdrop-blur-sm p-6 rounded-2xl max-w-xs">
            <p className="text-lg font-serif italic tracking-normal font-thin">
              {`"Our mission is to create a haven where people can reconnect with themselves and find balance in their busy lives"`}
            </p>
            <p className="mt-4 font-medium">— Ngoc Le, Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
