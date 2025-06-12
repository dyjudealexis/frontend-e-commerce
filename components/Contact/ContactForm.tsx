// components/ContactForm.tsx
"use client";

import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-form spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title from-blog__title">
              <h2>Send Me A Message</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Contact Form Column */}
          <div className="col-lg-6 col-md-6 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-0">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
              <div className="mb-0">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
              <div className="mb-0">
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control mb-3"
                  rows={5}
                />
              </div>
              <div className="text-start">
                <button type="submit" className="site-btn">
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Column */}
          <div className="col-lg-6 col-md-6">
            <div className="checkout__order">
              <h4 className="fw-bold mb-2">Contact Information</h4>
              <ul className="list-unstyled">
                <li className="mb-0">
                  <strong>Name:</strong> Jude Alexis Dy
                </li>
                <li className="mb-0">
                  <strong>Phone:</strong> +63 9204042919
                </li>
                <li className="mb-0">
                  <strong>Email:</strong> dyjudealexis@gmail.com
                </li>
                <li className="mb-0">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://jude-alexis-dy.site"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    jude-alexis-dy.site
                  </a>
                </li>
                <li className="mb-0">
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href="https://linkedin.com/in/jude-alexis-dy-9b7213215"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/jude-alexis-dy
                  </a>
                </li>
                <li className="mb-0">
                  <strong>Location:</strong> Taguig City, Metro Manila,
                  Philippines
                </li>
                <li className="mb-0">
                  <strong>Availability:</strong> Mon–Fri, 9AM–6PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
