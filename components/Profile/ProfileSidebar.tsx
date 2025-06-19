"use client";

import { removeAuthCookies } from "@/utils/headerUtils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      href: "/profile",
      label: "My Profile",
      icon: "icon_profile",
      className: "",
    },
    {
      href: "/profile/orders",
      label: "Your Orders",
      icon: "icon_bag",
      className: "",
    },
    {
      href: "/profile/orders/completed",
      label: "Completed Orders",
      icon: "icon_check",
      className: "",
    },
  ];

  const handleLogout = async () => {
    removeAuthCookies();

    await fetch("/api/delete-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE_SERVER}` }),
    });

    await fetch("/api/delete-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE_SERVER}` }),
    });

    // Optional: redirect to login or homepage
    toast.success("Logout Successful!");
    router.push("/login");
  };

  return (
    <div className="col-lg-3 mb-4 d-lg-block d-none">
      <div className="list-group gap-2">
        {links.map(({ href, label, className, icon }) => {
          const isActive =
            href === "/profile"
              ? pathname.startsWith("/profile") &&
                !pathname.startsWith("/profile/orders")
              : pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`list-group-item list-group-item-action fw-semibold d-flex align-items-center gap-2 border ${
                className || ""
              } ${isActive ? "active" : ""}`}
            >
              <i className={`${icon}`}></i>
              {label}
            </Link>
          );
        })}
        <button
          className={`list-group-item list-group-item-action fw-semibold d-flex align-items-center gap-2 border border-radius-24 list-group-logout`}
          onClick={handleLogout}
        >
          <i className={``}></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
