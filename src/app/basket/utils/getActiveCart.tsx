'use server';

import CartService from '@/service/api/CartService';

export async function getActiveCart() {
  const cartService = new CartService();
  const result = await cartService.getActiveCart();
  return result;
}
