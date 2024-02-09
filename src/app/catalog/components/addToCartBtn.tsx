'use client';

import { useState, useEffect } from 'react';
import { addToCart, removeFromCart } from '../utils/addToCart';
import Loader from './loader';
import { deletePromocode } from '@/app/basket/utils/promocode-actions';
import { getActiveCart } from '@/app/basket/utils/getActiveCart';

export default function AddToCartBtn({ inCart, itemId }: { inCart: number; itemId: string }) {
  const [productQty, setProductQty] = useState(inCart);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const product = window.document.getElementById(itemId);
    if (productQty === 0) product?.classList.add('hidden');
  }, [productQty]);
  const addProduct = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      await addToCart(itemId);
      setProductQty(productQty + 1);
      setIsLoading(false);
    };
  };
  const removeProduct = () => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      const cart = await removeFromCart(itemId);
      setProductQty(productQty - 1);
      if (cart.lineItems.length === 0 && cart.discountCodes.length !== 0) {
        for (const promoInfo of cart.discountCodes) {
          const newActiveCart = await getActiveCart();
          await deletePromocode(newActiveCart.id, newActiveCart.version, promoInfo.discountCode.id);
        }
      }
      setIsLoading(false);
    };
  };
  return (
    <>
      {productQty === 0 ? (
        <form onSubmit={addProduct()}>
          <button className=" flex bg-emerald-900 text-white rounded px-2 py-1 ">Add to cart</button>
        </form>
      ) : (
        <div className="flex justify-between items-center bg-emerald-900 text-white rounded py-1 leading-5 sm:leading-6 ">
          <form onSubmit={removeProduct()}>
            <button className="  border-r px-2 border-white " id="minus" name="minus">
              -
            </button>
          </form>
          {isLoading ? (
            <div className="px-0 py-0 sm:px-2 h-5">
              <Loader size={20} />
            </div>
          ) : (
            <span className="w-[20px] sm:w-[36px] text-center">{productQty}</span>
          )}
          <form onSubmit={addProduct()}>
            <button className=" border-l px-2 border-white" id="plus" name="plus">
              +
            </button>
          </form>
        </div>
      )}
    </>
  );
}
