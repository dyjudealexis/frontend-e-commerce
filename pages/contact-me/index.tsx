import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

const ContactForm = dynamic(() => import("@/components/Contact/ContactForm"), {
  ssr: false,
});

const ContactMe = () => {
  const pageTitle = "Contact Me | E-Commerce Customer Support & Inquiries";
  const pageDescription =
    "Get in touch with the E-Commerce team. Whether you need support, have questions, or want to partner with us — we're here to help.";
  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/contact-me`; // Replace with your actual URL
  const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/img/og-image.webp`; // Replace with your image URL

  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="contact e-commerce, customer service, support, inquiries, help desk"
        />
        <meta name="author" content="E-Commerce Inc." />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="E-Commerce" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@ecommerce" />
        <meta name="twitter:creator" content="@ecommerce" />

        {/* Optional: Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <ContactForm />
      <Footer />
    </>
  );
};

export default ContactMe;
