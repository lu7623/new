'use server';

import CartService from '@/service/api/CartService';

export async function addPromocode(cartID: string, cartVersion: number, promocode: string) {
  const cartService = new CartService();
  const result = await cartService.addPromocode(cartID, cartVersion, promocode);
  return result;
}

export async function deletePromocode(cartID: string, cartVersion: number, promocodeID: string) {
  const cartService = new CartService();
  const result = await cartService.deletePromocode(cartID, cartVersion, promocodeID);
  return result;
}
