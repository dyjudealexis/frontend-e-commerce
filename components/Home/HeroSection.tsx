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
              style={{ backgroundImage: 'url("/img/hero/banner.jpg")' }}
            >
              <div className="hero__text">
                <span>FRUIT FRESH</span>
                <h2>
                  Vegetable <br />
                  100% Organic
                </h2>
                <p>Free Pickup and Delivery Available</p>
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
