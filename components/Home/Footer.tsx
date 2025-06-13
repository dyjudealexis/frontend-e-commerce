'use client';
// components/Footer.tsx

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="footer spad">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__about__logo">
                                <Link href="/">
                                    <Image src="/img/logo.png" alt="Logo" width={186} height={40} />
                                </Link>
                            </div>
                            <ul>
                                <li>Address: Taguig City, Metro Manila, Philippines</li>
                                <li>Phone: +63 920 404 2919</li>
                                <li>Email: dyjudealexis@gmail.com</li>
                            </ul>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                        <div className="footer__widget">
                            <h6>Useful Links</h6>
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/shop">Shop</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li><Link href="/contact-me">Contact</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                            <h6>Join Our Newsletter Now</h6>
                            <p>Get E-mail updates about our latest shop and special offers.</p>
                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Enter your mail" />
                                <button type="submit" className="site-btn">Subscribe</button>
                            </form>
                            <div className="footer__widget__social">
                                <Link href="#"><i className="fa fa-facebook"></i></Link>
                                <Link href="#"><i className="fa fa-instagram"></i></Link>
                                <Link href="#"><i className="fa fa-twitter"></i></Link>
                                <Link href="#"><i className="fa fa-pinterest"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer__copyright">
                            <div className="footer__copyright__text">
                                <p>
                                    &copy; {new Date().getFullYear()} E-Commerce All rights reserved | Developed by{' '}
                                    
                                    <Link href="https://www.jude-alexis-dy.site" target="_blank" className='footer-a' rel="noopener noreferrer">Jude Alexis Dy</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
