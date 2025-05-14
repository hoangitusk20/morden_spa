import React from "react";

const Map = () => {
  return (
    <section className="pt-20">
      <div className="container-custom">
        <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.8105648202295!2d106.60064247480683!3d10.9019968892545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d5950d091e83%3A0x2ffc367db90e02ea!2zMzQ0IELDuWkgVGjhu4sgTMO5bmcsIFRo4bubaSBUYW0gVGjDtG4sIEjDs2MgTcO0biwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1747213938779!5m2!1svi!2s"
            className="w-full h-full border-0"
            loading="lazy"
            title="SereneSpa location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
