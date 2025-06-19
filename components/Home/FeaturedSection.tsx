"use client";

import React from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useApi } from "@/utils/swr";
import { Product } from "@/models";
import Spinner from "../Others/Spinner";
import toast from "react-hot-toast";
import { addToCart } from "@/utils/cart";

const shuffleArray = (array: Product[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface FeaturedSectionProps {
  title?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title = "Featured Products",
}) => {
  // 1) Pass the Product[] generic to useApi
  const { data, error, isLoading } = useApi<Product[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=8&shuffle=true`
  );

  const handleAddToCart = (product: Product) => {
    try {
      addToCart({
        product_id: product.product_id,
        image: product.image || "/img/default.jpg",
        name: product.name,
        quantity: 1,
        price: product.price_cents / 100,
      });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add item to cart.");
    }
  };

  // 2) Guard against undefined data
  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <section className="featured spad">
        <div className="container">
          <h2>Failed to load products.</h2>
        </div>
      </section>
    );
  }
  if (!data) return <Spinner />; // optional extra guard

  // Now data is Product[]
  const products = shuffleArray(data).slice(0, 8);

  return (
    <section className="featured spad">
      <div className="container">
        <div className="section-title from-blog__title">
          <h2>{title}</h2>
        </div>
        <div className="row featured__filter">
          {products.map((product) => {
            const ttId = `tt-${product.product_id}`;
            return (
              <div
                key={product.product_id}
                className={`col-lg-3 col-md-4 col-sm-6 mix ${product.category}`}
              >
                <div className="featured__item">
                  <div
                    className="featured__item__pic set-bg"
                    style={{
                      backgroundImage: `url(${
                        product.image || "/img/default.jpg"
                      })`,
                    }}
                  >
                    <ul className="featured__item__pic__hover">
                      <li
                        data-tooltip-id={ttId}
                        data-tooltip-content="View Details"
                        data-tooltip-place="top"
                      >
                        <Link href={`/shop/details?id=${product.product_id}`}>
                          <i className="fa fa-expand" />
                        </Link>
                      </li>
                      <li
                        data-tooltip-id={ttId}
                        data-tooltip-content="Add to Cart"
                        data-tooltip-place="top"
                      >
                        <button onClick={() => handleAddToCart(product)}>
                          <i className="fa fa-shopping-cart" />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="featured__item__text">
                    <h6>
                      <Link href="#">{product.name}</Link>
                    </h6>
                    <h5>₱{(product.price_cents / 100).toFixed(2)}</h5>
                    <div className="d-flex justify-content-center mt-3 gap-2">
                      <button
                        className="primary-btn border-0"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                      <Link
                        href={`/shop/details?id=${product.product_id}`}
                        className="light-btn border shop-expand-btn"
                        data-tooltip-id={ttId}
                        data-tooltip-content="View Details"
                        data-tooltip-place="top"
                      >
                        <i className="fa fa-expand" />
                      </Link>
                    </div>
                  </div>
                </div>
                <Tooltip id={ttId} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
