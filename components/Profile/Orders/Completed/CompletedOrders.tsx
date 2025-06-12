'use client';

import React from "react";
import Image from "next/image";
import ProfileSidebar from "../../ProfileSidebar";

const CompletedOrders: React.FC = () => {
  const completed = [
    {
      id: 201,
      name: "Mango Basket",
      image: "/img/product/product-6.jpg",
      price: 45.0,
      quantity: 1,
      total: 45.0,
    },
    {
      id: 202,
      name: "Potato Bag",
      image: "/img/product/product-3.jpg",
      price: 60.0,
      quantity: 3,
      total: 180.0,
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
            <h4 className="fw-bold mb-3">Completed Orders</h4>
            <div className="shoping__cart__table">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th className="shoping__product">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((item) => (
                    <tr key={item.id}>
                      <td className="shoping__cart__item d-flex align-items-center gap-3">
                        <Image src={item.image} alt={item.name} width={70} height={70} />
                        <h6 className="mb-0">{item.name}</h6>
                      </td>
                      <td className="pt-5">${item.price.toFixed(2)}</td>
                      <td className="pt-5">{item.quantity}</td>
                      <td className="pt-5">${item.total.toFixed(2)}</td>
                      <td className="pt-5"><span className="badge bg-success">Completed</span></td>
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

export default CompletedOrders;
