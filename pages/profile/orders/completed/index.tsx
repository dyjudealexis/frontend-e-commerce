import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
import CompletedOrders from '@/components/Profile/Orders/Completed/CompletedOrders'

import React from 'react'

const Completed = () => {
  return (
    <>
      <Header />

      <CompletedOrders />

      <Footer />
    </>
  )
}

export default Completed
