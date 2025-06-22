"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useApi } from "@/utils/swr";
import Spinner from "../Others/Spinner";
import { Product } from "@/models";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { addToCart } from "@/utils/cart";
import toast from "react-hot-toast";

const ProductSection: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paramsReady, setParamsReady] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  // Wait until searchParams is fully _defined_, not just once rendered
  useEffect(() => {
    if (searchParams) {
      setParamsReady(true);
    }
  }, [searchParams]);

  // Only build the query _after_ params are ready
  const queryParams = React.useMemo(() => {
    if (!paramsReady) return null;

    const qp = new URLSearchParams({ limit: "12" });
    if (searchQuery) qp.set("search", searchQuery);
    if (categoryQuery) qp.set("category", categoryQuery);
    return qp.toString();
  }, [paramsReady, searchQuery, categoryQuery]);

  // Only fetch when ready, preventing initial "all products" fetch
  const {
    data: products,
    error: productError,
    isLoading,
  } = useApi<Product[]>(
    paramsReady
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams}`
      : null
  );

  const {
    data: categories,
    error: categoryError,
    isLoading: categoriesLoading,
  } = useApi<string[]>(
    paramsReady
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?distinctCategory=true`
      : null
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const qp = new URLSearchParams({ limit: "12" });
    if (selected !== "all") qp.set("category", selected);
    router.replace(`/shop?${qp.toString()}`, undefined);
  };

  // Show spinner until everything is ready
  if (
    !paramsReady ||
    isLoading ||
    !products ||
    categoriesLoading ||
    !categories
  ) {
    return <Spinner />;
  }

  if (productError || categoryError) {
    return <div>Failed to load data.</div>;
  }

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

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <aside className="sidebar">
              <div className="sidebar__item">
                <h4>Category</h4>
                <ul>
                  <li>
                    <Link
                      href="/shop"
                      className={!categoryQuery ? "active" : ""}
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.map((cat, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/shop?category=${encodeURIComponent(cat)}`}
                        className={categoryQuery === cat ? "active" : ""}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="mb-4 d-block d-lg-none">
              <label htmlFor="category-select" className="form-label fw-bold">
                Category
              </label>
              <select
                id="category-select"
                className="form-select border-radius-24"
                onChange={handleCategoryChange}
                value={categoryQuery || "all"}
              >
                <option value="all">All Products</option>
                {categories.map((cat, idx) => (
                  <option value={cat} key={idx}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.product_id}
                    className="col-lg-4 col-md-6 col-sm-6"
                  >
                    <div className="product__item">
                      <div
                        className="product__item__pic"
                        style={{
                          backgroundImage: `url(${product.image || "/img/default.jpg"
                            })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: "250px",
                        }}
                      >
                        <ul className="product__item__pic__hover">
                          <li
                            className="with-tooltip"
                            data-tooltip-content="View Details"
                            data-tooltip-place="top"
                          >
                            <Link
                              href={`/shop/details?id=${product.product_id}`}
                            >
                              <i className="fa fa-expand" />
                            </Link>
                          </li>
                          <li
                            className="with-tooltip"
                            data-tooltip-content="Add to Cart"
                            data-tooltip-place="top"
                          >
                            <button onClick={() => handleAddToCart(product)}>
                              <i className="fa fa-shopping-cart" />
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>
                          <Link href={`/shop/details?id=${product.product_id}`}>
                            {product.name}
                          </Link>
                        </h6>
                        <h5>₱{(product.price_cents / 100).toFixed(2)}</h5>
                        <div className="d-flex justify-content-center mt-3 gap-2">
                          <button className="primary-btn border-0 with-tooltip" onClick={() => handleAddToCart(product)}>
                            Add to cart
                          </button>
                          <Link
                            href={`/shop/details?id=${product.product_id}`}
                            className="light-btn border shop-expand-btn with-tooltip"
                            data-tooltip-content="View Details"
                            data-tooltip-place="top"
                          >
                            <i className="fa fa-expand" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Tooltip anchorSelect=".with-tooltip" />
    </section>
  );
};

export default ProductSection;
