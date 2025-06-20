"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/models";
import { useApi } from "@/utils/swr";
import Spinner from "@/components/Others/Spinner";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { addToCart } from "@/utils/cart"; // Import your cart utils
import { toast } from "react-hot-toast"; // Import hot toast
import { useRouter } from "next/router";
import { setCookie } from "@/utils/cookies";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [isBuying, setIsBuying] = useState(false);

  const {
    data: product,
    error,
    isLoading,
  } = useApi<Product>(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}` : null
  );

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () => handleQuantityChange(quantity - 1);

  const handleAddToCart = () => {
    if (!product) return;

    try {
      addToCart({
        product_id: product.product_id,
        image: product.image || "/img/default.jpg",
        name: product.name,
        quantity,
        price: product.price_cents / 100,
      });

      setQuantity(1);

      toast.success(`${product.name} added to cart!`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to add to cart.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !product) {
    return (
      <div className="text-center mt-5 text-danger">
        Failed to load product.
      </div>
    );
  }

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      setIsBuying(true);

      addToCart(
        {
          product_id: product.product_id,
          image: product.image || "/img/default.jpg",
          name: product.name,
          quantity,
          price: product.price_cents / 100,
        },
        `${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`
      );

      setCookie(`${process.env.NEXT_PUBLIC_HAS_CART_COOKIE}`, "cart_true");

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

      router.push("/shop/checkout");
    } catch {
      toast.error("Failed to proceed to checkout.");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <Image
                  className="product-image img-fluid border-radius-24"
                  src={product.image || "/img/placeholder.jpg"}
                  alt={product.name}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="product__details__text">
              <h3>{product.name}</h3>
              <div className="product__details__price fw-bold">
                ₱{(product.price_cents / 100).toFixed(2)}
              </div>
              <p>{product.description}</p>

              <div className="d-flex gap-1 w-100">
                <div className="product__details__quantity">
                <div className="quantity">
                  <div
                    className="pro-qty"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <button
                      onClick={decrement}
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
                      type="number"
                      value={quantity}
                      readOnly
                      style={{
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        textAlign: "center",
                        width: "95px",
                      }}
                    />
                    <button
                      onClick={increment}
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
              </div>

              <button
                onClick={handleBuyNow}
                className="primary-btn border-0 d-flex align-items-center justify-content-center"
                disabled={isBuying}
              >
                {isBuying ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Buying...
                  </>
                ) : (
                  "Buy Now"
                )}
              </button>
              <button
                onClick={handleAddToCart}
                className="heart-icon border-0 rounded-pill with-tooltip"
                data-tooltip-content="Add to Cart"
                data-tooltip-place="top"
              >
                <span className="icon_cart_alt"></span>
              </button>
              </div>
              

              <ul>
                <li>
                  <b>Availability</b> <span>{"In Stock"}</span>
                </li>
                <li>
                  <b>Shipping</b>{" "}
                  <span>
                    01 day shipping. <samp> Free pickup today</samp>
                  </span>
                </li>
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Tooltip anchorSelect=".with-tooltip" />
    </section>
  );
};

export default ProductDetails;
