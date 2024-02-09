import Image from 'next/image';
import Link from 'next/link';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center w-full font-serif h-96">
      <Image src="/empty-cart.png" width={200} height={200} alt="empty cart" className="inline-block" />
      <h1 className=" text-2xl py-3">Your cart is empty!</h1>
      <Link href="/catalog">
        <button className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-xl">
          Start shopping for a great day
        </button>
      </Link>
    </div>
  );
}
