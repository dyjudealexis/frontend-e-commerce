'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const CategoriesSection: React.FC = () => {
  const categories = [
    { title: 'Fresh Fruit', image: '/img/categories/cat-1.jpg' },
    { title: 'Dried Fruit', image: '/img/categories/cat-2.jpg' },
    { title: 'Vegetables', image: '/img/categories/cat-3.jpg' },
    { title: 'Drink Fruits', image: '/img/categories/cat-4.jpg' },
    { title: 'Drink Fruits', image: '/img/categories/cat-5.jpg' },
  ];

  return (
    <section className="categories">
      <div className="container">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          centerMode
          centerSlidePercentage={25}
        >
          {categories.map((cat, index) => (
            <div key={index} style={{ padding: '10px' }}>
              <div
                className="categories__item"
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'cover',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '10px',
                  color: 'white',
                }}
              >
                <h5><a href="#">{cat.title}</a></h5>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CategoriesSection;
