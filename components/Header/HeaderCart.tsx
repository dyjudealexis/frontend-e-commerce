"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { getEncryptedCookie } from "@/utils/cookieWithCrypto";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { UserCookie } from "@/models";
import { removeAuthCookies } from "@/utils/headerUtils";
import FullPageSpinner from "../Others/FullPageSpinner";

type HeaderCartProps = {
  cartItemCount: number;
  cartTotalPrice: number;
};

const HeaderCart: React.FC<HeaderCartProps> = ({
  cartItemCount,
  cartTotalPrice,
}) => {
  const session_token = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE}`
  );
  const user = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_USER_COOKIE}`
  ) as UserCookie | null;
  const is_auth = getEncryptedCookie(
    `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`
  );
  // const router = useRouter();

  const isAuthenticated = session_token && user && is_auth === "auth_true";
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start loading

    try {
      removeAuthCookies();

      await fetch("/api/delete-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE_SERVER}`,
        }),
      });

      await fetch("/api/delete-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE_SERVER}`,
        }),
      });

      // Optional: redirect to login or homepage
      toast.dismiss();
      toast.success("Logout Successful!");
      // router.push("/login");
      window.location.href = '/login';
    } catch (error) {
      toast.error("Logout failed. Try again.");
      console.error(error);
    } finally {
      setIsLoggingOut(false); // End loading
    }
  };

  return (
    <div className="col-lg-3">
      <div className="header__cart">
        <ul>
          <li>
            {isAuthenticated ? (
              <Dropdown className="d-lg-none d-block">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="header-dropdown"
                >
                  <i className="fa fa-user me-1"></i>
                  {user.full_name}
                </Dropdown.Toggle>

                <Dropdown.Menu className="overflow-hidden">
                  <Dropdown.Item as="span" href="/profile">
                    <Link href="/profile" className="header-dropdown-link">
                      My Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="span" href="/profile/orders">
                    <Link
                      href="/profile/orders"
                      className="header-dropdown-link"
                    >
                      Your Orders
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="span" href="/profile/orders/completed">
                    <Link
                      href="/profile/orders/completed"
                      className="header-dropdown-link"
                    >
                      Completed Orders
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="span" onClick={handleLogout}>
                    <button
                      className="header-dropdown-link header-dropdown-logout-mobile"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link
                href="/login"
                className="d-lg-none d-block text-black fw-semibold"
              >
                <i className="fa fa-user"></i> Login
              </Link>
            )}
          </li>
          <li>
            <Link href="/shop/cart">
              <i className="fa fa-shopping-bag"></i>{" "}
              <span>{cartItemCount}</span>
            </Link>
          </li>
        </ul>
        <div className="header__cart__price">
          {cartItemCount} items: <span>₱{cartTotalPrice.toFixed(2)}</span>
        </div>
      </div>
      {isLoggingOut && <FullPageSpinner />}
    </div>
  );
};

export default HeaderCart;
