"use client";

import Link from "next/link";
import React from "react";

const ProductSection: React.FC = () => {
  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-5">
            <aside className="sidebar">
              {/* Department */}
              <div className="sidebar__item">
                <h4>Department</h4>
                <ul>
                  <li>
                    <a href="#">Fresh Meat</a>
                  </li>
                  <li>
                    <a href="#">Vegetables</a>
                  </li>
                  <li>
                    <a href="#">Fruit & Nut Gifts</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-7">
            {/* Filter Section */}

            {/* Product List */}
            <div className="row">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic"
                      style={{
                        backgroundImage: `url(/img/product/product-${index}.jpg)`,
                      }}
                    >
                      <ul className="product__item__pic__hover">
                        <li>
                          <Link href="/shop/details">
                            <i className="fa fa-expand"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <Link href="#">Crab Pool Security</Link>
                      </h6>
                      <h5>$30.00</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
