// components/HeroSection.tsx
"use client";

import React from 'react';
import Search from '../Home/Search';
import { useSearchParams } from 'next/navigation';

const HeroSection: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <section className="hero hero-normal">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Search value={searchQuery} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
