// components/ShoppingCart.tsx

'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ShoppingCart: React.FC = () => {
  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          {/* Products Table */}
          <div className="col-lg-8">
            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th className="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      name: "Vegetable’s Package",
                      image: "/img/cart/cart-1.jpg",
                      price: 55.0,
                      total: 110.0,
                    },
                    {
                      id: 2,
                      name: "Fresh Garden Vegetable",
                      image: "/img/cart/cart-2.jpg",
                      price: 39.0,
                      total: 39.99,
                    },
                    {
                      id: 3,
                      name: "Organic Bananas",
                      image: "/img/cart/cart-3.jpg",
                      price: 69.0,
                      total: 69.99,
                    },
                  ].map((item) => (
                    <tr key={item.id}>
                      <td className="shoping__cart__item">
                        <Image src={item.image} alt={item.name} width={70} height={70} />
                        <h5>{item.name}</h5>
                      </td>
                      <td className="shoping__cart__price">${item.price.toFixed(2)}</td>
                      <td className="shoping__cart__quantity">
                        <div className="quantity">
                          <div className="pro-qty">
                            <input type="text" defaultValue="1" />
                          </div>
                        </div>
                      </td>
                      <td className="shoping__cart__total">${item.total.toFixed(2)}</td>
                      <td className="shoping__cart__item__close">
                        <span className="icon_close"></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="shoping__cart__btns mt-4">
              <Link href="/shop" className="primary-btn cart-btn">CONTINUE SHOPPING</Link>
            </div>
          </div>

          {/* Cart Total / Checkout */}
          <div className="col-lg-4">
            <div className="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>Subtotal <span>₱454.98</span></li>
                <li>Total <span>₱454.98</span></li>
              </ul>
              <Link href="/shop/checkout" className="primary-btn">PROCEED TO CHECKOUT</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
