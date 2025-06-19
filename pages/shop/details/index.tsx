// pages/shop/details.tsx
import React from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import type { Product } from "@/models";
import FeaturedSection from "@/components/Home/FeaturedSection";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

// Dynamically import the client-side ProductDetails component
const ProductDetails = dynamic(
  () => import("@/components/Shop/Details/ProductDetails"),
  { ssr: false }
);

interface DetailsProps {
  product: Product;
}

const Details: NextPage<DetailsProps> = ({ product }) => {
  const siteUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://www.example.com";
  const pageUrl = `${siteUrl}/shop/details?id=${product.product_id}`;
  const title = `${product.name} | Buy Now on E‑Commerce`;
  const description =
    product.description?.slice(0, 160) ||
    `High-quality ${product.name} available now at E‑Commerce.`;
  const image = product.image || `${siteUrl}/img/placeholder.jpg`;

  return (
    <>
      <Head>
        {/* Standard SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="E‑Commerce" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@ecommerce" />
        <meta name="twitter:creator" content="@ecommerce" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <ProductDetails />
      <FeaturedSection title="You might also like" />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DetailsProps> = async (
  context
) => {
  const { id } = context.query;
  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    return { notFound: true };
  }

  const product: Product = await res.json();

  return {
    props: { product },
  };
};

export default Details;
