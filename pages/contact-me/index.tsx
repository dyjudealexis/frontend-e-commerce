import React from "react";
// import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import('@/components/Contact/ContactForm'), { ssr: false });

const ContactMe = () => {
  return (
    <>
      <Header />

      <ContactForm />

      <Footer />
    </>
  );
};

export default ContactMe;
