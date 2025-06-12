'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                  <li>Free Shipping for all Order of $99</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                  <a href="#"><i className="fa fa-pinterest-p"></i></a>
                </div>
                <div className="header__top__right__language">
                  <Image src="/img/ph-flag.png" alt="Language" width={20} height={20} />
                  <div>PHP</div>
                  <span className="arrow_carrot-down"></span>
                  <ul>
                    <li><a href="#">PHP</a></li>
                  </ul>
                </div>
                <div className="header__top__right__auth">
                  <Link href="/login"><i className="fa fa-user"></i> Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <Link href="/">
                <Image src="/img/logo.png" alt="Logo" width={186} height={40} />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul className='d-flex justify-content-center'>
                <li className={pathname === '/' ? 'active' : ''}><Link href="/">Home</Link></li>
                <li className={isActive('/shop') ? 'active' : ''}><Link href="/shop">Shop</Link></li>
                <li className={isActive('/blog') ? 'active' : ''}><Link href="/blog">Blog</Link></li>
                <li className={isActive('/contact-me') ? 'active' : ''}><Link href="/contact-me">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li><Link href="/shop/cart"><i className="fa fa-shopping-bag"></i> <span>3</span></Link></li>
              </ul>
              <div className="header__cart__price">2 items: <span>$150.00</span></div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
