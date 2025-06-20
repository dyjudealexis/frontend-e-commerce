//components/Home/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  getCookie,
  calculateCartInfo,
  savePathIfAllowed,
  checkDirectCart,
  updateHasCartCookie,
} from "@/utils/headerUtils";
import { hasCartItems } from "@/utils/cart";
import dynamic from "next/dynamic";

const HeaderTop = dynamic(() => import("../Header/HeaderTop"), { ssr: false });
const MobileNav = dynamic(() => import("../Header/MobileNav"), { ssr: false });
const HeaderCart = dynamic(() => import("../Header/HeaderCart"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const cartCookieName = process.env.NEXT_PUBLIC_CART_COOKIE || "cart";
  const lastCookieRef = useRef("");

  const isActive = (path: string) => pathname.startsWith(path);
  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  const updateCartInfo = () => {
    const { totalItems, totalPrice } = calculateCartInfo();
    setCartItemCount(totalItems);
    setCartTotalPrice(totalPrice);
  };

  useEffect(() => {
    savePathIfAllowed(pathname);
    checkDirectCart(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileNavOpen(false);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateCartInfo(); // Initial load
    window.addEventListener("storage", updateCartInfo); // Handle cross-tab changes

    // Poll for cookie changes
    const interval = setInterval(() => {
      const currentCookie = getCookie(cartCookieName);
      if (currentCookie !== lastCookieRef.current) {
        lastCookieRef.current = currentCookie;
        updateCartInfo();
      }
    }, 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateCartInfo);
    };
  }, [cartCookieName]);

  useEffect(() => {
    hasCartItems(`${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`);
    // console.log(hasCartItems(`${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`))
    hasCartItems(`${process.env.NEXT_PUBLIC_CART_COOKIE}`);
    // console.log(hasCartItems(`${process.env.NEXT_PUBLIC_CART_COOKIE}`))
    updateHasCartCookie();
  }, []);

  return (
    <>
      <header className="header">
        <HeaderTop />

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link href="/">
                  <Image
                    src="/img/logo.png"
                    alt="Logo"
                    width={186}
                    height={40}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <nav className="header__menu">
                <ul className="d-flex justify-content-center">
                  <li className={pathname === "/" ? "active" : ""}>
                    <Link href="/">Home</Link>
                  </li>
                  <li className={isActive("/about") ? "active" : ""}>
                    <Link href="/about">About</Link>
                  </li>
                  <li className={isActive("/shop") ? "active" : ""}>
                    <Link href="/shop">Shop</Link>
                  </li>

                  <li className={isActive("/contact-me") ? "active" : ""}>
                    <Link href="/contact-me">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <HeaderCart
              cartItemCount={cartItemCount}
              cartTotalPrice={cartTotalPrice}
            />
          </div>

          {/* Hamburger icon */}
          <div className="humberger__open d-lg-none" onClick={toggleMobileNav}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileNavOpen && (
        <>
          <MobileNav closeMobileNav={closeMobileNav} />
        </>
      )}
    </>
  );
};

export default Header;
