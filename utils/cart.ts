import { setEncryptedCookie, getEncryptedCookie, removeCookie } from './cookieWithCrypto';

export type CartItem = {
  product_id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
};

export type Cart = CartItem[];

function getCartCookieName(name?: string): string {
  return name ?? `${process.env.NEXT_PUBLIC_CART_COOKIE}`;
}

// Get the current cart
export function getCart(name?: string): Cart {
  return getEncryptedCookie<Cart>(getCartCookieName(name)) ?? [];
}

// Add a new item or update quantity if item already exists
export function addToCart(item: CartItem, name?: string): void {
  const cookieName = getCartCookieName(name);
  const cart = getEncryptedCookie<Cart>(cookieName) ?? [];
  const index = cart.findIndex((i) => i.product_id === item.product_id);
  if (index !== -1) {
    cart[index].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  setEncryptedCookie(cookieName, cart);
}

// Update an existing item's quantity or replace it
export function updateCartItem(item: CartItem, name?: string): void {
  const cookieName = getCartCookieName(name);
  const cart = getEncryptedCookie<Cart>(cookieName) ?? [];
  const index = cart.findIndex((i) => i.product_id === item.product_id);
  if (index !== -1) {
    cart[index] = item;
    setEncryptedCookie(cookieName, cart);
  }
}

// Remove an item by ID
export function removeFromCart(itemId: number, name?: string): void {
  const cookieName = getCartCookieName(name);
  const cart = getEncryptedCookie<Cart>(cookieName) ?? [];
  const updatedCart = cart.filter((item) => item.product_id !== itemId);
  setEncryptedCookie(cookieName, updatedCart);
}

// Clear the entire cart
export function clearCart(name?: string): void {
  removeCookie(getCartCookieName(name));
}

// Check if cart has items; if not, reset to empty array and return false
export function hasCartItems(name?: string): boolean {
  const cookieName = getCartCookieName(name);
  const cart = getEncryptedCookie<Cart>(cookieName);

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    setEncryptedCookie(cookieName, []);
    return false;
  }

  return true;
}