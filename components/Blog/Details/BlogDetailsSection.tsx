"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BlogDetailsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="blog-details">
      <div className="container">
        <div className="row">
          {/* Image Section */}
          <div className="col-md-6 mb-4">
            <Image
              src="/img/blog/details/details-pic.jpg"
              alt="Blog Detail"
              width={isMobile ? 360 : 500}
              height={isMobile ? 240 : 350}
              className="img-fluid w-100 border-radius-24 border"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h3 className="fw-bold mb-4">
              The corner window forms a place within a place that is a resting
              point within the large space.
            </h3>
            <p>
              The study area is situated at the rear of the property, offering a
              serene and uninterrupted view of the expansive natural landscape.
              Surrounded by lush greenery and distant rolling hills, it provides
              a peaceful environment ideal for concentration and reflection.
              This tranquil setting is further enhanced by its thoughtful
              placement alongside the other buildings on the premises, which
              together form a harmonious layout that encourages both
              productivity and relaxation. The connection to nature through
              large windows and natural lighting makes the study area not just a
              place to work, but a retreat that fosters inspiration and calm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSection;
