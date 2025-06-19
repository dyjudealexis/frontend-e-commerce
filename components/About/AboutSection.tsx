"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AboutSection = () => {
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
        <div className="row d-flex align-items-center">
          {/* Image Section */}
          <div className="col-md-6 mb-4">
            <Image
              src="/img/about/about-gif.gif" // Make sure to update the image path
              alt="E-Commerce Overview"
              width={isMobile ? 360 : 500}
              height={isMobile ? 240 : 350}
              className="img-fluid w-100 border-radius-24"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h3 className="fw-bold">
              {`Empowering Your Business Through`}
            </h3>
            <h3 className="fw-bold mb-4">
              {`E-Commerce Innovation`}
            </h3>
            <p className="text-black">
              {`In today's digital era, e-commerce stands at the forefront of
              global trade—enabling businesses of all sizes to reach customers
              anytime, anywhere. Our platform is designed to support modern
              sellers with tools that simplify inventory management, payment
              processing, and logistics.`}
            </p>
            <p className="text-black">
              {`Whether you're launching your first online store or expanding your
              existing digital presence, our solution provides a robust
              foundation for success. With integrated analytics, mobile
              responsiveness, and a customer-first approach, we help you stay
              competitive in a rapidly evolving market. Welcome to the future of
              commerce.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
