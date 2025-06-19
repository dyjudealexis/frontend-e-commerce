import React from "react";
import Head from "next/head";
import AboutSection from "@/components/About/AboutSection";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";

const About = () => {
  const pageTitle = "About Us | Leading E-Commerce Solutions Provider";
  const pageDescription =
    "Discover who we are at E-Commerce. We provide top-tier e-commerce technology, secure transactions, and a seamless customer experience.";
  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/about`; // Replace with your actual URL
  const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/img/og-image.webp`; // Replace with your image URL

  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="E-Commerce, Online Store, Digital Shopping, Secure Payment, About Us" />
        <meta name="author" content="E-Commerce Inc." />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="E-Commerce" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@ecommerce" /> {/* Replace with your Twitter handle */}
        <meta name="twitter:creator" content="@ecommerce" />

        {/* Favicon (optional) */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <AboutSection />
      <Footer />
    </>
  );
};

export default About;
