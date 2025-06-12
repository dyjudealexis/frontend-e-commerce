// components/BreadcrumbSection.tsx

import React from 'react';
import Link from 'next/link';

interface BreadcrumbSectionProps {
  backgroundImage?: string;
  title?: string;
  currentPage?: string;
}

const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({
  backgroundImage = '/img/breadcrumb.jpg',
  title = 'Organi Shop',
  currentPage = 'Shop',
}) => {
  return (
    <section
      className="breadcrumb-section set-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>{title}</h2>
              <div className="breadcrumb__option">
                <Link href="/">Home</Link>
                <span>{currentPage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbSection;
