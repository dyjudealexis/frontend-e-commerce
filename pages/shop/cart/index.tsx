import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '@/components/Home/Header';
import Footer from '@/components/Home/Footer';

const ShoppingCart = dynamic(() => import('@/components/Shop/Cart/ShoppingCart'), { ssr: false });

const Cart = () => {
  const pageTitle = "Your Cart | Checkout Items - E-Commerce";
  const pageDescription =
    "View items in your shopping cart, update quantities, apply vouchers, and proceed to secure checkout on E-Commerce.";
  const pageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/shop/cart`; // Replace with your actual URL
  const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/img/og-image.webp`; // Replace with your image URL

  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="shopping cart, checkout, e-commerce cart, view cart, order summary"
        />
        <meta name="author" content="E-Commerce Inc." />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (Facebook, LinkedIn) */}
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
      <ShoppingCart />
      <Footer />
    </>
  );
};

export default Cart;
