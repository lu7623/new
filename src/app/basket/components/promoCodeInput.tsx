'use client';

import { useState } from 'react';
import { addPromocode, deletePromocode } from '../utils/promocode-actions';
import SuccessPopup from '@/app/account/components/popup/successPopup';
import { getActiveCart } from '../utils/getActiveCart';
import { DiscountCodeInfo } from '@commercetools/platform-sdk';

export default function Promocode({
  cartID,
  cartVersion,
  price,
  discountPrice,
  promos,
}: {
  cartID: string;
  cartVersion: number;
  price: number;
  discountPrice: number;
  promos: (string | undefined)[];
}) {
  const [value, setValue] = useState('');
  const [successChange, setSuccessChange] = useState(false);
  const [chageMessage, setChageMessage] = useState('');
  const [errorChange, setErrorChange] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  async function addPromocodeToCart() {
    try {
      if (promos.includes(value)) {
        setErrorChange(true);
        setChageMessage('Promocode applied already');
        setTimeout(() => {
          setErrorChange(false);
        }, 3000);
      } else {
        const result = await addPromocode(cartID, cartVersion, value);

        if (result.discountCodes[result.discountCodes.length - 1]?.state === 'DoesNotMatchCart') {
          setErrorChange(true);
          setChageMessage('The conditions of the promocode have not been met.');
          setTimeout(() => {
            setErrorChange(false);
          }, 3000);
        }
        if (result.discountCodes[result.discountCodes.length - 1]?.state === 'MatchesCart') {
          if (result.discountCodes.some((code) => code.state === 'ApplicationStoppedByPreviousDiscount')) {
            setSuccessChange(true);
            setChageMessage('Promocode has been successfully applyed, but previous promocode was cancelled.');
            setTimeout(() => {
              setSuccessChange(false);
            }, 3000);
            return;
          }
          setSuccessChange(true);
          setChageMessage('Promocode has been successfully applyed');
          setTimeout(() => {
            setSuccessChange(false);
          }, 3000);
        }
        if (result.discountCodes[result.discountCodes.length - 1]?.state === 'ApplicationStoppedByPreviousDiscount') {
          setErrorChange(true);
          setChageMessage('Promocode cannot be used together with previously applied promotional codes.');
          setTimeout(() => {
            setErrorChange(false);
          }, 3000);
        }
        return result;
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorChange(true);
        setChageMessage('Invalid promocode');
        setTimeout(() => {
          setErrorChange(false);
        }, 3000);
      }
    }
  }

  async function deletePromocodeFromCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const activeCart = await getActiveCart();
      const promocodesInfo: DiscountCodeInfo[] = activeCart.discountCodes;
      for (const promoInfo of promocodesInfo) {
        const newActiveCart = await getActiveCart();
        await deletePromocode(newActiveCart.id, newActiveCart.version, promoInfo.discountCode.id);
      }
      setSuccessChange(true);
      setChageMessage('Promocodes have been successfully removed');
      setTimeout(() => {
        setSuccessChange(false);
      }, 3000);
      setValue('');
    } catch (err) {
      if (err instanceof Error) {
        setErrorChange(true);
        setChageMessage('Something went wrong...');
        setTimeout(() => {
          setErrorChange(false);
        }, 3000);
      }
    }
  }

  return (
    <section className="md:mx-10 mx-6">
      <SuccessPopup message={chageMessage} errorChange={errorChange} successChange={successChange} />
      <div className="flex justify-end items-center gap-1 py-4 ">
        <h2 className="text-end font-serif font-bold text-rose-500 uppercase">Enter promocode</h2>
      </div>
      <form className="flex flex-col items-end gap-1 font-serif" action={addPromocodeToCart}>
        <div className="">
          <label className="relative">
            <button className="absolute right-0" type="button" onClick={() => setValue('')}>
              &#10060;
            </button>
            <input
              className="text-start px-2 border border-emerald-900 focus:outline-none focus:border-emerald-900 rounded focus:shadow-sm focus:shadow-emerald-700"
              type="text"
              value={value}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {promos.length > 0 && (
          <div>
            Used promocodes:
            {promos.map((code, i) => (
              <span className="block text-gray-500 text-end" key={i}>
                {code}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-1">
          <button className="flex bg-emerald-900 text-white rounded px-2 py-1" type="submit">
            Apply
          </button>{' '}
          <button className="flex bg-emerald-900 text-white rounded px-2 py-1" onClick={deletePromocodeFromCart}>
            Remove Promocodes
          </button>
        </div>
      </form>
      {price > discountPrice ? (
        <>
          <div className="flex flex-col items-end py-3 sm:text-2xl min-[320px]:text-xl font-bold">
            <div className="text-emerald-900 line-through decoration-rose-700">
              Total price: {price?.toFixed(2)} USD
            </div>
          </div>
          <div className="flex flex-col items-end text-end py-3 text-2xl md:text-3xl sm:text-2xl font-bold">
            <div className="text-rose-700">New total price with promocode: {discountPrice.toFixed(2)} USD</div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-end py-3 sm:text-2xl min-[320px]:text-xl font-bold">
          <div className="text-emerald-900">Total price: {price?.toFixed(2)} USD</div>
        </div>
      )}
    </section>
  );
}
