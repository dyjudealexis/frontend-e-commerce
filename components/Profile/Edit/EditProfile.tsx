"use client";
import React, { useState } from "react";
import ProfileSidebar from "../ProfileSidebar";
import Link from "next/link";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    country: "United States",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 555-123-4567",
    email: "john.doe@example.com",
    orderNotes: "Leave at front door",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic goes here (e.g., API call)
    alert("Profile updated!");
  };

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="col-lg-9">
            <h4 className="fw-bold mb-3">Edit Profile</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
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
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={profile.zip}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    name="address1"
                    value={profile.address1}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={profile.address2}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <label>Order Notes</label>
                  <input
                    type="text"
                    name="orderNotes"
                    value={profile.orderNotes}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <Link href="/profile" className="primary-btn cart-btn">
                Cancel
              </Link>

              <button type="submit" className="site-btn mt-3">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
