"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  CartItem,
  clearCart,
} from "@/utils/cart";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 999999) return;

    const updatedItems = cartItems.map((item) => {
      if (item.product_id === id) {
        const updatedItem = { ...item, quantity: newQuantity };
        updateCartItem(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const increment = (id: number) => {
    const item = cartItems.find((item) => item.product_id === id);
    if (item) handleQuantityChange(id, item.quantity + 1);
  };

  const decrement = (id: number) => {
    const item = cartItems.find((item) => item.product_id === id);
    if (item) handleQuantityChange(id, item.quantity - 1);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.product_id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          {cartItems.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h4 className="fw-bold">No products found in your cart.</h4>
              <Link href="/shop" className="primary-btn mt-3">
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <>
              <div className="col-lg-8">
                <div className="shoping__cart__table overflow-auto w-100">
                  <table className="table">
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
                      {cartItems.map((item) => (
                        <tr key={item.product_id}>
                          <td className="shoping__cart__item d-flex align-items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={70}
                              height={70}
                              className="border-radius-24"
                            />
                            <h5>{item.name}</h5>
                          </td>
                          <td className="shoping__cart__price pt-5">
                            ₱{item.price.toFixed(2)}
                          </td>
                          <td className="shoping__cart__quantity pt-5">
                            <div className="quantity">
                              <div
                                className="pro-qty"
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                <button
                                  onClick={() => decrement(item.product_id)}
                                  style={{
                                    position: "absolute",
                                    left: 5,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    border: "none",
                                    background: "none",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                  }}
                                >
                                  −
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  style={{
                                    paddingLeft: "30px",
                                    paddingRight: "30px",
                                    textAlign: "center",
                                    width: "95px",
                                  }}
                                />
                                <button
                                  onClick={() => increment(item.product_id)}
                                  style={{
                                    position: "absolute",
                                    right: 5,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    border: "none",
                                    background: "none",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="shoping__cart__total pt-5">
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="shoping__cart__item__close pt-5">
                            <span
                              className="icon_close"
                              onClick={() => handleRemove(item.product_id)}
                            ></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="shoping__cart__btns mt-4 d-flex gap-2">
                  <Link href="/shop" className="primary-btn">
                    CONTINUE SHOPPING
                  </Link>
                  <button
                    className="primary-btn cart-btn border-0"
                    onClick={() => {
                      clearCart();
                      setCartItems([]);
                    }}
                  >
                    Clear all
                  </button>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="shoping__checkout border-radius-24">
                  <h5>Cart Total</h5>
                  <ul>
                    {cartItems.map((item) => (
                      <li key={item.product_id}>
                        {item.name} × {item.quantity}
                        <span className="fw-semibold text-black">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                    <li
                      style={{
                        fontWeight: "bold",
                        borderTop: "1.5px solid #000000",
                        paddingTop: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Subtotal <span>₱{subtotal.toFixed(2)}</span>
                    </li>
                    <li
                      style={{
                        fontWeight: "bold",
                        borderTop: "1.5px solid #000000",
                        paddingTop: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Total <span>₱{subtotal.toFixed(2)}</span>
                    </li>
                  </ul>
                  <Link href="/shop/checkout" className="primary-btn">
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
