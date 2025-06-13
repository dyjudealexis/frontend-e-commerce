'use client';
import Image from 'next/image';
import React from 'react';

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const products: Product[] = [
  { id: 1, title: 'Crab Pool Security', price: '₱30.00', image: '/img/latest-product/lp-1.jpg' },
  { id: 2, title: 'Crab Pool Security', price: '₱30.00', image: '/img/latest-product/lp-2.jpg' },
  { id: 3, title: 'Crab Pool Security', price: '₱30.00', image: '/img/latest-product/lp-3.jpg' },
];

const renderProductItems = () => {
  return (
    <>
      {products.map((product) => (
        <a key={product.id} href="#" className="latest-product__item">
          <div className="latest-product__item__pic">
            <Image src={product.image} alt={product.title} width={70} height={70} />
          </div>
          <div className="latest-product__item__text">
            <h6>{product.title}</h6>
            <span>{product.price}</span>
          </div>
        </a>
      ))}
    </>
  );
};

const LatestProducts: React.FC = () => {
  return (
    <section className="latest-product spad">
      <div className="container">
        <div className="row">
          {['Latest Products', 'Top Rated Products', 'Review Products'].map((title, idx) => (
            <div className="col-lg-4 col-md-6" key={idx}>
              <div className="latest-product__text">
                <h4>{title}</h4>
                {/* Placeholder for slider - Replace with Swiper/Slick */}
                <div className="latest-product__slider">
                  <div className="latest-prdouct__slider__item">{renderProductItems()}</div>
                  <div className="latest-prdouct__slider__item">{renderProductItems()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
