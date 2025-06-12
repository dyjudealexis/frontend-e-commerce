import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
// import ProductDetails from '@/components/Shop/Details/ProductDetails'
import dynamic from 'next/dynamic';
const ProductDetails = dynamic(() => import('@/components/Shop/Details/ProductDetails'), { ssr: false });


import React from 'react'

const Details = () => {
  return (
    <>
      <Header />

      {/* <HeroSection /> */}
      <ProductDetails />
      
      <Footer />
    </>
  )
}

export default Details
