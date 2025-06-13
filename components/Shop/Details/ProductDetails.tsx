'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () => handleQuantityChange(quantity - 1);

  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <Image
                  className="product__details__pic__item--large"
                  src="/img/product/details/product-details-1.jpg"
                  alt="Main product"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>Vegetable’s Package</h3>
              <div className="product__details__price">₱50.00</div>
              <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a...</p>

              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty" style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                      onClick={decrement}
                      style={{
                        position: 'absolute',
                        left: 5,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'none',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      style={{
                        paddingLeft: '30px',
                        paddingRight: '30px',
                        textAlign: 'center',
                        width: '80px'
                      }}
                    />
                    <button
                      onClick={increment}
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'none',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <Link href="/shop/checkout" className="primary-btn">Buy Now</Link>
              <Link href="#" className="heart-icon">
                <span className="icon_cart_alt"></span>
              </Link>

              <ul>
                <li><b>Availability</b> <span>In Stock</span></li>
                <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                <li><b>Weight</b> <span>0.5 kg</span></li>
                <li><b>Share on</b>
                  <div className="share">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-pinterest"></i></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="product__details__tab">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Information</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews <span>(1)</span></a>
                </li>
              </ul>

              <div className="tab-content">
                {['1', '2', '3'].map((tab) => (
                  <div
                    key={tab}
                    className={`tab-pane ${tab === '1' ? 'active' : ''}`}
                    id={`tabs-${tab}`}
                    role="tabpanel"
                  >
                    <div className="product__details__tab__desc">
                      <h6>Products Information</h6>
                      <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui... (Tab {tab} content)</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
