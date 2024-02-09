'use server';

import CartService from '@/service/api/CartService';

export async function addToCart(id: string) {
  const cartService = new CartService();
  await cartService.addProductToCart(id, 1);
}

export async function removeFromCart(id: string) {
  const cartService = new CartService();
  const lineItemId = (await cartService.getActiveCart()).lineItems.find((p) => p.productId === id)?.id;
  const result = await cartService.removeProductFromCart(lineItemId ? lineItemId : '', 1);
  return result;
}
