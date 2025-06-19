// utils/loadCheckoutData.ts
import { CartItem, getCart, hasCartItems } from "./cart";
import { getEncryptedCookie } from "./cookieWithCrypto";
import type { UserCookie } from "@/models";

export const loadCheckoutData = () => {
  const cookieName = `${process.env.NEXT_PUBLIC_DIRECT_CART_COOKIE}`;
  const cart: CartItem[] = hasCartItems(cookieName)
    ? getCart(cookieName)
    : getCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cookieKey = process.env.NEXT_PUBLIC_USER_COOKIE!;
  const raw = getEncryptedCookie(cookieKey);
  const user = raw as UserCookie;

  const profile = {
    full_name: user?.full_name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    country: user?.addresses?.[0]?.country ?? "",
    state: user?.addresses?.[0]?.state ?? "",
    city: user?.addresses?.[0]?.city ?? "",
    line1: user?.addresses?.[0]?.line1 ?? "",
    line2: user?.addresses?.[0]?.line2 ?? "",
    postal_code: user?.addresses?.[0]?.postal_code ?? "",
    order_notes: user?.addresses?.[0]?.order_notes ?? "",
    address_id: user?.addresses?.[0]?.address_id ?? 0,
  };

  return { cart, subtotal, profile };
};
