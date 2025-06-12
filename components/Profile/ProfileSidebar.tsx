"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileSidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/profile", label: "My Profile", icon: "icon_profile" },
    { href: "/profile/orders", label: "Your Orders", icon: "icon_bag" },
    { href: "/profile/orders/completed", label: "Completed Orders", icon: "icon_check" },
    { href: "#", label: "Logout", icon: "icon_logout", className: "text-danger" },
  ];

  return (
    <div className="col-lg-3 mb-4">
      <div className="list-group">
        {links.map(({ href, label, className, icon }) => (
          <Link
            key={href}
            href={href}
            className={`list-group-item list-group-item-action fw-semibold d-flex align-items-center gap-2 ${className || ""} ${
              pathname === href ? "active" : ""
            }`}
          >
            <i className={`${icon}`}></i>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
