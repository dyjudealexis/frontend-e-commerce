"use client";

import { getEncryptedCookie } from "@/utils/cookieWithCrypto";
import {
  headerValidateWithPrefix,
  removeAuthCookies,
} from "@/utils/headerUtils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserCookie } from "@/models";

const HeaderTop = () => {
  const session_token = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE}`
  );
  const user = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_USER_COOKIE}`
  ) as UserCookie | null;
  const is_auth = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`
  );
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    headerValidateWithPrefix(`${process.env.NEXT_PUBLIC_IS_PAID}`, "paid");
    headerValidateWithPrefix(
      `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`,
      "auth"
    );
  }, []);

  const isAuthenticated = session_token && user && is_auth === "auth_true";

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start loading

    try {
      removeAuthCookies();

      await fetch("/api/delete-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE_SERVER}`,
        }),
      });

      await fetch("/api/delete-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE_SERVER}`,
        }),
      });

      toast.success("Logout Successful!");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Try again.");
      console.error(error);
    } finally {
      setIsLoggingOut(false); // End loading
    }
  };

  return (
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
                <Link href="#">
                  <i className="fa fa-facebook"></i>
                </Link>
                <Link href="#">
                  <i className="fa fa-twitter"></i>
                </Link>
                <Link href="#">
                  <i className="fa fa-linkedin"></i>
                </Link>
                <Link href="#">
                  <i className="fa fa-pinterest-p"></i>
                </Link>
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
                    <Link href="#">PHP</Link>
                  </li>
                </ul>
              </div>
              <div className="header__top__right__auth">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="header-dropdown"
                    >
                      <i className="fa fa-user me-1"></i>
                      {user.full_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="overflow-hidden">
                      <Dropdown.Item as="span">
                        <Link href="/profile" className="header-dropdown-link">
                          My Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item as="span">
                        <Link
                          href="/profile/orders"
                          className="header-dropdown-link"
                        >
                          Your Orders
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item as="span">
                        <Link
                          href="/profile/orders/completed"
                          className="header-dropdown-link"
                        >
                          Completed Orders
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item as="span">
                        <button
                          className="header-dropdown-link header-dropdown-logout"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                        >
                          {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link href="/login">
                    <i className="fa fa-user"></i> Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
