// components/Home/HeroSection.tsx
'use client';

import React from 'react';
import Search from './Search';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          {/* Search and Banner */}
          <div className="col-lg-12">
            <Search />

            <div
              className="hero__item set-bg"
              style={{ backgroundImage: 'url("/img/hero/banner-1.webp")', backgroundPositionY: "40%" }} // Update to a relevant image
            >
              <div className="hero__text">
                <span>NEW SEASON</span>
                <h2 className='hero-h2'>
                  Stylish Clothing <br />
                  For Every Occasion
                </h2>
                <p>Free Shipping on Orders Over ₱50</p>
                <Link href="/shop" className="primary-btn">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
