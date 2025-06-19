'use client';

import { CartItem, getCart } from './cart'; // adjust path as needed

/**
 * Checks if a given CartItem can be added without exceeding a quantity of 10
 * @param newItem The item the user is trying to add
 * @returns boolean — true if total quantity would be <= 10, otherwise false
 */
export function canAddToCart(newItem: CartItem): boolean {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.product_id === newItem.product_id
  );

  const totalQuantity = (existingItem?.quantity ?? 0) + newItem.quantity;

  return totalQuantity <= 99;
}
