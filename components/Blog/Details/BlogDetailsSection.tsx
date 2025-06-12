"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BlogDetailsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="blog-details">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-4 col-md-5 order-md-1 order-2">
            <div className="blog__sidebar"></div>
          </div>
          {/* Main Blog Content */}
          <div className="col-12 order-md-1 order-1">
            <div className="blog__details__text">
              <Image
                src="/img/blog/details/details-pic.jpg"
                alt=""
                width={730}
                height={isMobile ? 300 : 500}
                className={`w-100 ${isMobile ? "h-auto" : ""}`}
              />
              <p>
                Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                vehicula elementum sed sit amet dui...
              </p>
              <h3>
                The corner window forms a place within a place that is a resting
                point within the large space.
              </h3>
              <p>
                The study area is located at the back with a view of the vast
                nature. Together with the other buildings...
              </p>
            </div>
          </div>{" "}
          {/* End of Main Blog */}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSection;
