'use client';

import { ProductCard } from '@/service/api/CatalogService';
import Link from 'next/link';
import AddToCartBtn from './addToCartBtn';

export default function CatalogCard({ product }: { product: ProductCard }) {
  const link = product.key ? `/product/${product.key}` : `/product/id/${product.ID}`;
  const img = {
    backgroundImage: `url(${product.mainImage})`,
    width: '9rem',
    height: '12rem',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: '0 20px',
  };
  return (
    <div className="flex flex-col justify-between h-96 mx-2 mb-3 px-6 py-3 border hover:drop-shadow-md hover:-translate-y-1 cursor-pointer break-inside-avoid w-min items-center bg-gray-100">
      <Link href={link}>
        <div className="flex flex-col justify-between h-72">
          <p className=" text-center font-bold text-base leading-4 text-emerald-900 highlightedSearch">
            {product.name}
          </p>
          <div className="flex" style={img}></div>
          <p className="leading-4 text-justify highlightedSearch">{product.description}</p>
        </div>
      </Link>
      <div
        className={`my-3 flex items-center  w-full ${product.discountedPrice ? 'justify-between' : 'justify-around'}`}
      >
        <div className="flex flex-col">
          {product.discountedPrice && (
            <span className="font-bold text-red-800">{(product.discountedPrice / 100).toFixed(2)} USD</span>
          )}
          <span className={`font-bold text-emerald-900 ${product.discountedPrice ? 'line-through' : ''}`}>
            {product.price ? product.price / 100 : null} USD
          </span>
        </div>
        <AddToCartBtn inCart={product.inCart ? product.inCart : 0} itemId={product.ID} />
      </div>
    </div>
  );
}
