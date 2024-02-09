'use server';

import CartService from '@/service/api/CartService';

export default async function clearHandler(cartID: string, cartVersion: number) {
  const cartService = new CartService();
  await cartService.deleteCart(cartID, cartVersion);
  const newCart = await cartService.createCart();
  cartService.updateCartProdsQty(newCart);
}
