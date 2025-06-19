"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProfileSidebar from "../ProfileSidebar";
import { useApi } from "@/utils/swr";
import { ApiResponse } from "@/models";
import Spinner from "@/components/Others/Spinner";
import api from "@/utils/axios";
import toast from "react-hot-toast";
import { Pagination } from "react-bootstrap";
import { formatDateToReadable } from "@/utils/formatDate";

const LIMIT = 5;

const YourOrders: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data: response, error, isLoading, mutate } = useApi<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile/order-items?status=pending&limit=${LIMIT}&page=${page}`
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleReceived = async (orderId: number, orderItemId: number) => {
    try {
      await api.put(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/order-items/${orderId}`, {
        items: [
          {
            order_item_id: orderItemId,
            status: "shipped",
          },
        ],
      });
      mutate();
      toast.success(`Thank you for your purchase!`);
    } catch (err) {
      console.error("Failed to update item status:", err);
      alert("Failed to update item status. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <ProfileSidebar />
            <div className="col-lg-9">
              <Spinner />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !response) {
    return <p className="text-center text-danger">Failed to load orders</p>;
  }

  const { data, meta } = response;

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <ProfileSidebar />
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
                    <th>Date Order</th>
                    <th>Status</th>
                    <th>Received?</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data.flatMap((order) =>
                      order.items.map((item) => (
                        <tr key={item.order_item_id}>
                          <td className="shoping__cart__item d-flex align-items-center gap-3">
                            <Image
                              src={item.product.image || ""}
                              alt={item.product.name}
                              width={70}
                              height={70}
                              className="rounded-4"
                            />
                            <h6 className="mb-0">{item.product.name}</h6>
                          </td>
                          <td className="pt-5">
                            ₱{(item.unit_price_cents / 100).toFixed(2)}
                          </td>
                          <td className="pt-5">{item.quantity}</td>
                          <td className="pt-5">
                            ₱{((item.unit_price_cents * item.quantity) / 100).toFixed(2)}
                          </td>
                          <td className="pt-5">
                            {formatDateToReadable(item.updated_at || "")}
                          </td>
                          <td className="pt-5">
                            <span className="badge bg-info text-capitalize">
                              {item.status}
                            </span>
                          </td>
                          <td className="pt-5">
                            <button
                              className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 border-radius-24"
                              title="Product received"
                              onClick={() =>
                                handleReceived(order.order_id, item.order_item_id)
                              }
                              disabled={item.status === "shipped"}
                            >
                              <i className="icon_check_alt2"></i> Received
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
              {data?.length === 0 && (
                <p className="text-muted text-center py-5">No current orders.</p>
              )}
            </div>

            {
              meta.totalPages >= 2 && <>
                {/* Full Pagination */}
                <div className="d-flex justify-content-center mt-4">
                  <Pagination className="d-flex gap-2">
                    <Pagination.Prev
                      onClick={() => handlePageChange(page - 1)}
                      disabled={meta.currentPage === 1}
                    />
                    {Array.from({ length: meta.totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === meta.currentPage}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(page + 1)}
                      disabled={meta.currentPage === meta.totalPages}
                    />
                  </Pagination>
                </div></>
            }

          </div>
        </div>
      </div>
    </section>
  );
};

export default YourOrders;
