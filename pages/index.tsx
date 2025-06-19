import React from "react";
import Head from "next/head";
import Header from "@/components/Home/Header";
import HeroSection from "@/components/Home/HeroSection";
import FeaturedSection from "@/components/Home/FeaturedSection";
import Footer from "@/components/Home/Footer";

const Home = () => {
  const pageTitle = "E-Commerce | Buy Smart, Live Better";
  const pageDescription =
    "Welcome to E-Commerce — your trusted partner in online shopping. Discover top-rated products, fast shipping, and seamless checkout experience.";
  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/`; // Replace with your actual URL
  const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/img/og-image.webp`; // Replace with your image URL

  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="e-commerce, online shopping, buy online, best deals, secure checkout" />
        <meta name="author" content="E-Commerce Inc." />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="E-Commerce" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@ecommerce" /> {/* Replace with your Twitter handle */}
        <meta name="twitter:creator" content="@ecommerce" />

        {/* Optional: Favicons */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <HeroSection />
      <FeaturedSection />
      <Footer />
    </>
  );
};

export default Home;
