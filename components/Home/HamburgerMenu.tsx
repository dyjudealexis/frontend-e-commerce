// components/Home/HamburgerMenu.tsx

'use client';
import Image from 'next/image';
import Link from 'next/link';

const HamburgerMenu: React.FC = () => {
  return (
    <>
      {/* <div className="humberger__menu__overlay"></div> */}
      <div className="">
        <div className="humberger__menu__logo">
          <Link href="/">
            <Image src="/img/logo.png" alt="Logo" width={100} height={50} />
          </Link>
        </div>
        <div className="humberger__menu__cart">
          <ul>
            <li>
              <Link href="#">
                <i className="fa fa-heart" /> <span>1</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa fa-shopping-bag" /> <span>3</span>
              </Link>
            </li>
          </ul>
          <div className="header__cart__price">
            item: <span>$150.00</span>
          </div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__language">
            <Image src="/img/language.png" alt="Language" width={20} height={20} />
            <div>English</div>
            <span className="arrow_carrot-down" />
            <ul>
              <li>
                <Link href="#">Spanish</Link>
              </li>
              <li>
                <Link href="#">English</Link>
              </li>
            </ul>
          </div>
          <div className="header__top__right__auth">
            <Link href="#">
              <i className="fa fa-user" /> Login
            </Link>
          </div>
        </div>
        <nav className="humberger__menu__nav mobile-menu">
          <ul>
            <li className="active">
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop-grid">Shop</Link>
            </li>
            <li>
              <Link href="#">Pages</Link>
              <ul className="header__menu__dropdown">
                <li>
                  <Link href="/shop-details">Shop Details</Link>
                </li>
                <li>
                  <Link href="/shopping-cart">Shopping Cart</Link>
                </li>
                <li>
                  <Link href="/checkout">Check Out</Link>
                </li>
                <li>
                  <Link href="/blog-details">Blog Details</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
          <Link href="#"><i className="fa fa-facebook" /></Link>
          <Link href="#"><i className="fa fa-twitter" /></Link>
          <Link href="#"><i className="fa fa-linkedin" /></Link>
          <Link href="#"><i className="fa fa-pinterest-p" /></Link>
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li><i className="fa fa-envelope" /> hello@colorlib.com</li>
            <li>Free Shipping for all Order of $99</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
