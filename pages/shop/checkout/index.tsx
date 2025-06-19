import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '@/components/Home/Header';
import Footer from '@/components/Home/Footer';

const CheckoutSection = dynamic(() => import('@/components/Shop/Checkout/CheckoutSection'), {
  ssr: false,
});

const Checkout = () => {
  const pageTitle = "Checkout | Secure Your Purchase - E-Commerce";
  const pageDescription =
    "Complete your purchase securely. Review your cart, enter shipping details, and choose a payment method for a smooth e-commerce experience.";
  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/shop/checkout`; // Replace with your actual URL
  const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/img/og-image.webp`; // Replace with your image URL

  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="checkout, e-commerce, complete purchase, payment, shipping, secure order"
        />
        <meta name="author" content="E-Commerce Inc." />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook / LinkedIn */}
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
        <meta name="twitter:site" content="@ecommerce" /> {/* Replace if applicable */}
        <meta name="twitter:creator" content="@ecommerce" />

        {/* Optional: Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <CheckoutSection />
      <Footer />
    </>
  );
};

export default Checkout;
