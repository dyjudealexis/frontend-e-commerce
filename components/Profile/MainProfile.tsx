'use client';
import React from 'react'
import ProfileSidebar from './ProfileSidebar';
import Link from 'next/link'; // if you're using Next.js for routing

const MainProfile = () => {
  const profileInfo = {
    firstName: 'John',
    lastName: 'Doe',
    country: 'United States',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '+1 555-123-4567',
    email: 'john.doe@example.com',
    orderNotes: 'Leave at front door',
  };

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">My Profile</h4>
              <Link href="/profile/edit" className="primary-btn">Edit</Link>
            </div>
            <div className="profile-info">
              <p className='text-black mb-1'><strong>Full Name:</strong> {profileInfo.firstName} {profileInfo.lastName}</p>
              <p className='text-black mb-1'><strong>Email:</strong> {profileInfo.email}</p>
              <p className='text-black mb-1'><strong>Phone:</strong> {profileInfo.phone}</p>
              <p className='text-black mb-1'><strong>Country:</strong> {profileInfo.country}</p>
              <p className='text-black mb-1'><strong>State:</strong> {profileInfo.state}</p>
              <p className='text-black mb-1'><strong>City:</strong> {profileInfo.city}</p>
              <p className='text-black mb-1'><strong>Address:</strong> {profileInfo.address1}, {profileInfo.address2}</p>
              <p className='text-black mb-1'><strong>Postcode/ZIP:</strong> {profileInfo.zip}</p>
              <p className='text-black mb-1'><strong>Order Notes:</strong> {profileInfo.orderNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProfile;
