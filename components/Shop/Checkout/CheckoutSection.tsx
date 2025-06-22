"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, clearCart } from "@/utils/cart";
import {
  getEncryptedCookie,
  setEncryptedCookie,
} from "@/utils/cookieWithCrypto";
import toast from "react-hot-toast";
import api from "@/utils/axios";
import { loadCheckoutData } from "@/utils/loadCheckoutData";
import inputFields from "@/assets/json/checkoutInputs.json";
import { Profile } from "@/models";
import { setCookie } from "@/utils/cookies";
import FullPageSpinner from "@/components/Others/FullPageSpinner";

const CheckoutSection: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    country: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
    email: "",
    order_notes: "",
    address_id: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 👈 loader state
  const lastVisitedPath = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_LAST_VISITED_PATH}`
  );

  // inside CheckoutSection...
  useEffect(() => {
    const { cart, subtotal, profile } = loadCheckoutData();
    setCartItems(cart);
    setSubtotal(subtotal);
    setProfile(profile);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        addresses: [
          {
            address_id: profile.address_id,
            line1: profile.line1,
            line2: profile.line2,
            city: profile.city,
            state: profile.state,
            postal_code: profile.postal_code,
            country: profile.country,
            order_notes: profile.order_notes,
          },
        ],
      };

      const order_transactions_payload = {
        shipping_address_id: profile.address_id,
        billing_address_id: profile.address_id,
        total_cents: subtotal * 100,
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price_cents: item.price * 100, // convert PHP to cents
        })),
        method: "cash_on_delivery",
        status: "pending",
      };

      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order-transaction`,
        order_transactions_payload
      );
      const response = await api.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
        payload
      );

      setEncryptedCookie(
        `${process.env.NEXT_PUBLIC_USER_COOKIE}`,
        response.data.user
      );
      setCookie(
        `${process.env.NEXT_PUBLIC_HAS_PLACE_ORDER_COOKIE}`,
        "place_order_true",
        {
          path: "/",
          sameSite: "Lax",
        }
      );

      if (lastVisitedPath === "/shop/cart"){
        clearCart(`${process.env.NEXT_PUBLIC_CART_COOKIE}`);
      }

      router.push("/shop/thank-you");
    } catch {
      toast.error("An error occurred while updating the profile.");
    } finally {
      setIsSubmitting(false); // <-- Stop loader
    }
  };

  return (
    <section className="checkout spad">
      <div className="container">
        <div className="checkout__form">
          <h4>Billing Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <div className="row">
                  {inputFields.map(
                    ({
                      name,
                      label,
                      type,
                      required,
                      readOnly,
                      className,
                      placeholder,
                    }) => (
                      <div
                        className={`checkout__input ${
                          ["line1", "line2"].includes(name)
                            ? "col-lg-12"
                            : "col-lg-6"
                        }`}
                        key={name}
                      >
                        <p>
                          {label}
                          {required && <span>*</span>}
                        </p>
                        <input
                          type={type}
                          name={name}
                          value={profile[name as keyof Profile]}
                          onChange={handleChange}
                          placeholder={placeholder || ""}
                          required={required}
                          readOnly={readOnly}
                          className={`${readOnly ? "read-only" : ""} ${
                            className || ""
                          }`}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="checkout__input">
                  <p>Order Notes</p>
                  <textarea
                    name="order_notes"
                    placeholder="Notes about your order, e.g. special instructions for delivery."
                    rows={3}
                    value={profile.order_notes}
                    onChange={handleChange}
                    className="border p-3 w-100"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="checkout__order">
                  <h4>Your Order</h4>
                  <div className="checkout__order__products">
                    Products <span>Total</span>
                  </div>
                  <ul>
                    {cartItems.map((item) => (
                      <li key={item.product_id}>
                        {item.name} × {item.quantity}
                        <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout__order__subtotal">
                    Subtotal <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="checkout__order__total">
                    Total <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-primary">
                    <em>
                      *This is a demo checkout only, no real charges will be
                      applied. Thank you.*
                    </em>
                  </p>
                  <button
                    type="submit"
                    className="site-btn d-flex align-items-center justify-content-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </> : "PLACE ORDER"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSubmitting && <FullPageSpinner />}
    </section>
  );
};

export default CheckoutSection;
