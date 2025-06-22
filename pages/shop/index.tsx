import React from 'react';
import Head from 'next/head';
import Header from '@/components/Home/Header';
import Footer from '@/components/Home/Footer';
import HeroSection from '@/components/Shop/HeroSection';
import ProductSection from '@/components/Shop/ProductSection';


const Shop = () => {
  const pageTitle = "Shop Online | Best Deals on Products - E-Commerce";
  const pageDescription =
    "Browse the latest and best-selling products in our E-Commerce shop. Enjoy secure checkout, fast delivery, and exclusive offers.";
  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/shop`; // Replace with your actual URL
  const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/img/og-image.webp`; // Replace with your image URL


  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="shop, e-commerce, online store, buy online, best deals, products"
        />
        <meta name="author" content="E-Commerce Inc." />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (Facebook/LinkedIn) */}
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
      <div className="position-relative">
        <Header />
        <HeroSection />
        <ProductSection />
        <Footer />
      </div>

    </>
  );
};

export default Shop;
