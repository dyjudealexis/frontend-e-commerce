// components/ThankYouPage.tsx

"use client";

import React from "react";
import Link from "next/link";

const ThankYouPage: React.FC = () => {
  return (
    <section className="thank-you spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="thank-you__content">
              <i className="fa fa-check-circle thank-you-check" aria-hidden="true"></i>

              <h2 className="my-4 fw-bold">Thank You for Your Purchase!</h2>
              <p className="mb-4">
                Your order has been placed successfully. We appreciate your
                business!
              </p>
              <div className="thank-you__actions">
                <Link href="/shop" className="primary-btn mr-2">
                  CONTINUE SHOPPING
                </Link>
                <Link href="/profile/orders" className="primary-btn cart-btn">
                  VIEW ORDER DETAILS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
