"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileNavOpen(false);
      }
    };

    // Initial check in case screen is already large
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope"></i> dyjudealexis@gmail.com
                    </li>
                    <li>Free Shipping for all Order of ₱99</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest-p"></i>
                    </a>
                  </div>
                  <div className="header__top__right__language">
                    <Image
                      src="/img/ph-flag.png"
                      alt="Language"
                      width={20}
                      height={20}
                    />
                    <div>PHP</div>
                    <span className="arrow_carrot-down"></span>
                    <ul>
                      <li>
                        <a href="#">PHP</a>
                      </li>
                    </ul>
                  </div>
                  <div className="header__top__right__auth">
                    <Link href="/login">
                      <i className="fa fa-user"></i> Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  <li className={isActive("/shop") ? "active" : ""}>
                    <Link href="/shop">Shop</Link>
                  </li>
                  <li className={isActive("/blog") ? "active" : ""}>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className={isActive("/contact-me") ? "active" : ""}>
                    <Link href="/contact-me">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li>
                    <Link href="/shop/cart">
                      <i className="fa fa-shopping-bag"></i> <span>3</span>
                    </Link>
                  </li>
                </ul>
                <div className="header__cart__price">
                  2 items: <span>₱150.00</span>
                </div>
              </div>
            </div>
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
          <div className="mobile__nav">
            {/* Close icon */}
           
            <div className="mobile__nav__content">
              <ul>
                <li className={pathname === "/" ? "active" : ""}>
                  <Link href="/" onClick={closeMobileNav}>
                    Home
                  </Link>
                </li>
                <li className={isActive("/shop") ? "active" : ""}>
                  <Link href="/shop" onClick={closeMobileNav}>
                    Shop
                  </Link>
                </li>
                <li className={isActive("/blog") ? "active" : ""}>
                  <Link href="/blog" onClick={closeMobileNav}>
                    Blog
                  </Link>
                </li>
                <li className={isActive("/contact-me") ? "active" : ""}>
                  <Link href="/contact-me" onClick={closeMobileNav}>
                    Contact
                  </Link>
                </li>
              </ul>
               <i
              className="fa fa-times"
              onClick={closeMobileNav}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 1060,
              }}
            ></i>
            </div>
            <div
              className="mobile__nav__backdrop"
              onClick={closeMobileNav}
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
