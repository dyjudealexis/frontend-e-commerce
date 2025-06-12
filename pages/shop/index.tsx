import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
// import BreadcrumbSection from '@/components/Shop/BreadcrumbSection'
import HeroSection from '@/components/Shop/HeroSection'
import ProductSection from '@/components/Shop/ProductSection'
import React from 'react'

const Shop = () => {
  return (
    <>
      <Header />

      <HeroSection />
      {/* <BreadcrumbSection /> */}
      <ProductSection />

      <Footer />
    </>
  )
}

export default Shop
