import React from "react";

const Video = () => {
  return (
    <section className="section-padding bg-gray-100 py-15">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase text-gray-400 text-md">
            See It In Action
          </span>
          <h2 className="text-3xl mt-2 mb-4 font-medium font-serif">
            Video Tour
          </h2>
          <p className="text-muted-foreground">
            Experience the ambiance and offerings of Serene Beauty Spa through
            our virtual tour video.
          </p>
        </div>

        <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/pjm2aXT3A2M?si=1JtUY2_laBUsE5Eb"
            title="Serene Spa Tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
