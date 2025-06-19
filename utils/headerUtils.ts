// utils/headerUtils.ts
import { getCart, hasCartItems } from "./cart"; // Adjust to your actual cart util
import { removeCookie, setCookie } from "./cookies";
import { getEncryptedCookie, setEncryptedCookie } from "./cookieWithCrypto";

export const excludedPaths = [
  "/login",
  "/register",
  "/profile",
  "/shop/checkout",
  "/shop/thank-you",
  "/profile/orders",
  "/profile/orders/completed",
];

export const getCookie = (name: string): string => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : "";
};

export const calculateCartInfo = () => {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

export const shouldSavePath = (pathname: string): boolean => {
  return !excludedPaths.some(
    (excluded) => pathname === excluded || pathname.startsWith(excluded + "/")
  );
};

export const savePathIfAllowed = (pathname: string) => {
  if (shouldSavePath(pathname)) {
    setEncryptedCookie(
      `${process.env.NEXT_PUBLIC_LAST_VISITED_PATH}`,
      pathname,
      {
        path: "/",
        sameSite: "Lax",
      }
    );
  }
};

export const headerValidate = (cookieName: string): boolean => {
  if (!cookieName) return false;

  const value = getCookie(cookieName);

  const isValid = value === "true";

  if (!isValid) {
    setEncryptedCookie(cookieName, "false");
  }

  return isValid;
};

export const headerValidateWithPrefix = (cookieName: string, prefix: string): boolean => {
  if (!cookieName) return false;

  const value = getEncryptedCookie(cookieName);

  const isValid = value === `${prefix}_true`;

  if (!isValid) {
    setEncryptedCookie(cookieName, `${prefix}_false`);
  }

  return isValid;
};

export const checkDirectCartAuthenticate = (): boolean => {
  const isAuthenticated = headerValidate(
    `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`
  );
  const hasCart = hasCartItems(
    `${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`
  );

  if (!isAuthenticated && !hasCart) {
    return false;
  } else {
    return true;
  }
};

export const checkDirectCart = (pathname: string) => {
  if (
    pathname !== "/shop/checkout" &&
    hasCartItems(`${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`)
  ) {
    setEncryptedCookie(
      `${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`,
      []
    );
  }
  // console.log(getCart(`${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`));
};

export const updateHasCartCookie = () => {
  const hasItems =
    hasCartItems() || hasCartItems(`${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`);

  setCookie(`${process.env.NEXT_PUBLIC_HAS_CART_COOKIE}`, hasItems ? "cart_true" : "cart_false", {
    path: "/",
    sameSite: "Lax",
  });
};

export const removeAuthCookies = () => {
  removeCookie(`${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE}`);
  removeCookie(`${process.env.NEXT_PUBLIC_USER_COOKIE}`);
  removeCookie(`${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE}`);
  removeCookie(`${process.env.NEXT_PUBLIC_IS_AUTHENTICATED_COOKIE_SERVER}`);
  removeCookie(`${process.env.NEXT_PUBLIC_SESSION_TOKEN_COOKIE_SERVER}`);
  removeCookie(`${process.env.NEXT_PUBLIC_ADDRESS_COOKIE}`);
  removeCookie(`${process.env.NEXT_PUBLIC_IS_PAID}`);
};