'use client';
import React, { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import Link from 'next/link';
import { getEncryptedCookie } from '@/utils/cookieWithCrypto';
import type { UserCookie } from '@/models';
import profileFields from '@/assets/json/profileFields.json';

const MainProfile = () => {
  const [profileInfo, setProfileInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    zip: '',
    orderNotes: ''
  });

  useEffect(() => {
    const cookieString = process.env.NEXT_PUBLIC_USER_COOKIE!;
    const raw = getEncryptedCookie(cookieString);
    const user = raw as UserCookie;
    if (user && user.full_name) {
      const addr = user.addresses?.[0] ?? {};
      setProfileInfo({
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        country: addr.country ?? '',
        state: addr.state ?? '',
        city: addr.city ?? '',
        address1: addr.line1 ?? '',
        address2: addr.line2 ?? '',
        zip: addr.postal_code ?? '',
        orderNotes: addr.order_notes ?? '',
      });
    }
  }, []);

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <ProfileSidebar />
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">My Profile</h4>
              <Link href="/profile/edit" className="primary-btn">Edit</Link>
            </div>
            <div className="profile-info">
              {profileFields.map(field => (
                <p key={field.key} className="mb-2 text-black">
                  <strong>{field.label}:</strong> {profileInfo[field.key as keyof typeof profileInfo]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProfile;
