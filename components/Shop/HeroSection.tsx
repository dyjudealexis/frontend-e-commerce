// components/HeroSection.tsx
import React from 'react';
import Search from '../Home/Search';

const HeroSection: React.FC = () => {
  return (
    <section className="hero hero-normal">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Search />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
