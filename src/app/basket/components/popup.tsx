'use client';

import clearHandler from '../utils/clearCart';

export default function CartPopup({
  cartId,
  cartVersion,
  exit,
}: {
  cartId: string;
  cartVersion: number;
  exit: () => void;
}) {
  return (
    <div className=" absolute left-1/4 md:left-1/3 top-1/3 w-1/2 md:w-1/3 h-1/3 font-serif bg-gray-100 drop-shadow-md flex flex-col justify-evenly rounded">
      <p className="px-4 text-lg md:text-2xl text-bold text-center text-emerald-800">
        You&apos;re going to clear your cart. This action is irreversible
      </p>
      <div className="flex justify-evenly w-full gap-2">
        <button
          className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white md:text-xl "
          onClick={() => {
            try {
              clearHandler(cartId, cartVersion);
            } catch {}
          }}
        >
          Continue
        </button>
        <button
          className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white md:text-xl"
          onClick={exit}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
