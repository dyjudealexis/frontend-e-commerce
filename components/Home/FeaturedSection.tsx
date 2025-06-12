'use client';

import React from 'react';

const products = [
  {
    id: 1,
    categories: ['oranges', 'fresh-meat'],
    image: '/img/featured/feature-1.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 2,
    categories: ['vegetables', 'fastfood'],
    image: '/img/featured/feature-2.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 3,
    categories: ['vegetables', 'fresh-meat'],
    image: '/img/featured/feature-3.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 4,
    categories: ['fastfood', 'oranges'],
    image: '/img/featured/feature-4.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 5,
    categories: ['fresh-meat', 'vegetables'],
    image: '/img/featured/feature-5.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 6,
    categories: ['oranges', 'fastfood'],
    image: '/img/featured/feature-6.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 7,
    categories: ['fresh-meat', 'vegetables'],
    image: '/img/featured/feature-7.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
  {
    id: 8,
    categories: ['fastfood', 'vegetables'],
    image: '/img/featured/feature-8.jpg',
    title: 'Crab Pool Security',
    price: 30,
  },
];

const FeaturedSection: React.FC = () => {
  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Product</h2>
            </div>
          </div>
        </div>
        <div className="row featured__filter">
          {products.map((product) => (
            <div
              key={product.id}
              className={`col-lg-3 col-md-4 col-sm-6 mix ${product.categories.join(' ')}`}
            >
              <div className="featured__item">
                <div
                  className="featured__item__pic set-bg"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <ul className="featured__item__pic__hover">
                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                  </ul>
                </div>
                <div className="featured__item__text">
                  <h6><a href="#">{product.title}</a></h6>
                  <h5>${product.price.toFixed(2)}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
