"use client";
import React, { useEffect, useState } from "react";
import ProfileSidebar from "../ProfileSidebar";
import Link from "next/link";
import { getEncryptedCookie, setEncryptedCookie } from "@/utils/cookieWithCrypto";
import type { UserCookie } from "@/models";
import api from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [profile, setProfile] = useState({
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
    address_id: 0, // <-- ADD THIS
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false); // <-- Loader state

  useEffect(() => {
    const cookieString = process.env.NEXT_PUBLIC_USER_COOKIE!;
    const raw = getEncryptedCookie(cookieString);
    const user = raw as UserCookie;

    if (user) {
      const addr = user.addresses?.[0] ?? {};
      setProfile({
        full_name: user.full_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        country: addr.country ?? "",
        state: addr.state ?? "",
        city: addr.city ?? "",
        line1: addr.line1 ?? "",
        line2: addr.line2 ?? "",
        postal_code: addr.postal_code ?? "",
        order_notes: addr.order_notes ?? "",
        address_id: addr.address_id ?? 0 , // <-- ADD THIS
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // <-- Start loader

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

      const response = await api.put(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, payload);

      // alert("Profile updated successfully!");
      toast.success("Profile updated successfully!")

      setEncryptedCookie(`${process.env.NEXT_PUBLIC_USER_COOKIE}`, response.data.user);

      router.push("/profile")
    } catch (error) {
      console.error("Failed to update profile:", error);
      // alert("An error occurred while updating the profile.");
      toast.error("An error occurred while updating the profile.")
    } finally {
      setLoading(false); // <-- Stop loader
    }
  };

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <ProfileSidebar />

          <div className="col-lg-9">
            <h4 className="fw-bold mb-3">Edit Profile</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label>Full Name<span>*</span></label>
                  <input
                    type="text"
                    name="full_name"
                    value={profile.full_name}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Country<span>*</span></label>
                  <input
                    type="text"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label>Address Line 1<span>*</span></label>
                <input
                  type="text"
                  name="line1"
                  placeholder="Street Address"
                  value={profile.line1}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="line2"
                  placeholder="Apartment, suite, unit etc (optional)"
                  value={profile.line2}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>City<span>*</span></label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Postal Code<span>*</span></label>
                  <input
                    type="text"
                    name="postal_code"
                    value={profile.postal_code}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label>Phone<span>*</span></label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Email<span>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                    className="form-control read-only"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label>Order Notes</label>
                <textarea
                  name="order_notes"
                  placeholder="Notes about your order, e.g. special instructions for delivery."
                  rows={3}
                  value={profile.order_notes}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <Link href="/profile" className="primary-btn cart-btn">
                Cancel
              </Link>
              <span className="me-2"></span>
              <button
                type="submit"
                className="site-btn mt-3"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
