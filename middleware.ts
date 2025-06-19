import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "./utils/validateSessionToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(
    `${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE_SERVER}`
  )?.value;

  const is_auth = request.cookies.get(
    `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE_SERVER}`
  )?.value;

  const isAuthenticated =
    token && isValidToken(`${token}`) && is_auth === "auth_true";

  // 🚫 Guest Middleware for /login and /register
  if ((pathname === "/login" || pathname === "/register") && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", request.url)); // or home `/`
  }

  // ✅ Protected Routes
  if (
    pathname.startsWith("/profile") ||
    pathname === "/shop/checkout" ||
    pathname === "/shop/thank-you"
  ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 🔒 Cart guard
    if (pathname === "/shop/checkout") {
      const cart = request.cookies.get(
        `${process.env.NEXT_PUBLIC_HAS_CART_COOKIE}`
      )?.value;
      if (cart !== "cart_true") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // 🔒 Order placement guard
    if (pathname === "/shop/thank-you") {
      const placed = request.cookies.get(
        `${process.env.NEXT_PUBLIC_HAS_PLACE_ORDER_COOKIE}`
      )?.value;
      if (placed !== "place_order_true") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile/:path*",
    "/shop/checkout",
    "/shop/thank-you",
  ],
};
