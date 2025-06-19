'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  closeMobileNav: () => void;
};

const MobileNav: React.FC<Props> = ({ closeMobileNav }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <div className="mobile__nav">
      <div className="mobile__nav__content">
        <ul>
          <li className={pathname === '/' ? 'active' : ''}>
            <Link href="/" onClick={closeMobileNav}>
              Home
            </Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link href="/about" onClick={closeMobileNav}>
              About
            </Link>
          </li>
          <li className={isActive('/shop') ? 'active' : ''}>
            <Link href="/shop" onClick={closeMobileNav}>
              Shop
            </Link>
          </li>
          <li className={isActive('/contact-me') ? 'active' : ''}>
            <Link href="/contact-me" onClick={closeMobileNav}>
              Contact
            </Link>
          </li>
        </ul>
        <i
          className="fa fa-times"
          onClick={closeMobileNav}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1060,
          }}
        ></i>
      </div>
      <div
        className="mobile__nav__backdrop"
        onClick={closeMobileNav}
      ></div>
    </div>
  );
};

export default MobileNav;
