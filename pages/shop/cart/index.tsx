import React from 'react'
import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
// import ShoppingCart from '@/components/Shop/Cart/ShoppingCart'
// import BreadcrumbSection from '@/components/Shop/BreadcrumbSection'
// import HeroSection from '@/components/Shop/HeroSection'
import dynamic from 'next/dynamic';
const ShoppingCart = dynamic(() => import('@/components/Shop/Cart/ShoppingCart'), { ssr: false });

const Cart = () => {
  return (
    <>
      <Header />

      {/* <HeroSection /> */}
      <ShoppingCart />
      
      <Footer />
    </>
  )
}

export default Cart
