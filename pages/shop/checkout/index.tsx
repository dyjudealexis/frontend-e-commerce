import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
import dynamic from 'next/dynamic';
// import CheckoutSection from '@/components/Shop/Checkout/CheckoutSection'
const CheckoutSection = dynamic(() => import('@/components/Shop/Checkout/CheckoutSection'), { ssr: false });

// import BreadcrumbSection from '@/components/Shop/BreadcrumbSection'
// import HeroSection from '@/components/Shop/HeroSection'

import React from 'react'

const Checkout = () => {
  return (
    <>
      <Header />

      {/* <HeroSection /> */}
      <CheckoutSection />

      <Footer />
    </>
  )
}

export default Checkout
