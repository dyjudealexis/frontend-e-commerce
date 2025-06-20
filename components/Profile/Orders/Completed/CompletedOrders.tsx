"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProfileSidebar from "../../ProfileSidebar";
import { useApi } from "@/utils/swr";
import { ApiResponse } from "@/models";
import Spinner from "@/components/Others/Spinner";
import { Pagination } from "react-bootstrap";
import { formatDateToReadable } from "@/utils/formatDate";

const LIMIT = 5;

const CompletedOrders: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data: response,
    error,
    isLoading,
  } = useApi<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile/order-items?status=shipped&limit=${LIMIT}&page=${page}`
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
    return (
      <p className="text-center text-danger">Failed to load completed orders</p>
    );
  }

  const { data, meta } = response;

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <ProfileSidebar />
          <div className="col-lg-9">
            <h4 className="fw-bold mb-3">Completed Orders</h4>
            <div className="shoping__cart__table">
              <table className="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th className="shoping__product">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Date Shipped</th>
                    <th>Status</th>
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
                            ₱
                            {(
                              (item.unit_price_cents * item.quantity) /
                              100
                            ).toFixed(2)}
                          </td>
                          <td className="pt-5 td-date">
                            {formatDateToReadable(item.updated_at || "")}
                          </td>
                          <td className="pt-5">
                            <span className="badge bg-success text-capitalize">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
              {data?.length === 0 && (
                <p className="text-muted text-center py-5">
                  No completed orders.
                </p>
              )}
            </div>

            {meta.totalPages >= 2 && (
              <>
                {/* Full Pagination */}
                <div className="d-flex justify-content-center mt-4">
                  <Pagination className="d-flex gap-2">
                    <Pagination.Prev
                      onClick={() => handlePageChange(page - 1)}
                      disabled={meta.currentPage === 1}
                      className="pagination"
                    />
                    {Array.from({ length: meta.totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === meta.currentPage}
                        onClick={() => handlePageChange(i + 1)}
                        className="pagination"
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(page + 1)}
                      disabled={meta.currentPage === meta.totalPages}
                      className="pagination"
                    />
                  </Pagination>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedOrders;
