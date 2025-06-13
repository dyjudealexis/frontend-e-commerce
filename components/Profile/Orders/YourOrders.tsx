"use client";

import React from "react";
import Image from "next/image";
import ProfileSidebar from "../ProfileSidebar";

const YourOrders: React.FC = () => {
  const orders = [
    {
      id: 101,
      name: "Organic Apples",
      image: "/img/product/product-8.jpg",
      price: 25.0,
      quantity: 2,
      total: 50.0,
      received: true,
    },
    {
      id: 102,
      name: "Carrot Box",
      image: "/img/product/product-11.jpg",
      price: 30.0,
      quantity: 1,
      total: 30.0,
      received: true,
    },
  ];

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="col-lg-9">
            <h4 className="fw-bold mb-3">Your Current Orders</h4>
            <div className="shoping__cart__table">
              <table className="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th className="shoping__product">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Received?</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="shoping__cart__item d-flex align-items-center gap-3">
                        <Image
                          src={order.image}
                          alt={order.name}
                          width={70}
                          height={70}
                          className="rounded-4"
                        />
                        <h6 className="mb-0">{order.name}</h6>
                      </td>
                      <td className="pt-5">${order.price.toFixed(2)}</td>
                      <td className="pt-5">{order.quantity}</td>
                      <td className="pt-5">${order.total.toFixed(2)}</td>
                      <td className="pt-5">
                        <span className="badge bg-info">Pending</span>
                      </td>
                      <td className="pt-5">
                        {order.received && (
                          <button
                            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 border-radius-24"
                            title="Product received"
                          >
                            <i className="icon_check_alt2"></i> Received
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourOrders;
