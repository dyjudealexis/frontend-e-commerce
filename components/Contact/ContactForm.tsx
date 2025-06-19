"use client";

import React, { useState } from "react";
import api from "@/utils/axios";
import toast from "react-hot-toast";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/inquiries", {
        full_name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!")
    } catch {
      // console.error(error);
      toast.error("Failed to send message.")
    } finally {
      setLoading(false);
    }
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
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="form-control mb-3"
                rows={5}
                required
              />
              <button type="submit" className="site-btn" disabled={loading}>
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </div>

          {/* Contact Info Column */}
          <div className="col-lg-6 col-md-6">
            <div className="checkout__order">
              <h4 className="fw-bold mb-2">Contact Information</h4>
              <ul className="list-unstyled">
                <li><strong>Name:</strong> Jude Alexis Dy</li>
                <li><strong>Phone:</strong> +63 9204042919</li>
                <li><strong>Email:</strong> dyjudealexis@gmail.com</li>
                <li><strong>Website:</strong> <a href="https://jude-alexis-dy.site" target="_blank" rel="noopener noreferrer" className="link-a">jude-alexis-dy.site</a></li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/jude-alexis-dy-9b7213215" target="_blank" rel="noopener noreferrer" className="link-a">linkedin.com/in/jude-alexis-dy</a></li>
                <li><strong>Location:</strong> Taguig City, Metro Manila, Philippines</li>
                <li><strong>Availability:</strong> Mon–Fri, 9AM–6PM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
