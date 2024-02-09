'use client';

import { createPortal } from 'react-dom';
import { useState } from 'react';
import CartPopup from './popup';

export default function ClearCart({ cartId, cartVersion }: { cartId: string; cartVersion: number }) {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <>
      <button
        className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white md:text-xl text-lg my-3 md:ml-10 ml-6"
        onClick={() => setPopupOpen(true)}
      >
        Clear cart
      </button>
      {popupOpen &&
        createPortal(
          <CartPopup cartId={cartId} cartVersion={cartVersion} exit={() => setPopupOpen(false)} />,
          document.body
        )}
    </>
  );
}
