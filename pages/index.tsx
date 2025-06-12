// import Banner from "@/components/Home/Banner";
// import BlogSection from "@/components/Home/BlogSection";
// import CategoriesSection from "@/components/Home/CategoriesSection";
import FeaturedSection from "@/components/Home/FeaturedSection";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import HeroSection from "@/components/Home/HeroSection";
// import LatestProducts from "@/components/Home/LatestProducts";
import React from "react";

const Home = () => {
  return (
    <>
      {/* <HamburgerMenu /> */}
      <Header />
      <HeroSection />
      {/* <CategoriesSection /> */}
      <FeaturedSection />
      {/* <Banner /> */}
      {/* <LatestProducts /> */}
      {/* <BlogSection /> */}
      <Footer />
    </>
  );
};

export default Home;
