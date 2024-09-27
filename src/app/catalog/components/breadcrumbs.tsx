import { CategoryResponse } from '@/app/api/types';
import Link from 'next/link';

export default function Breadcrumbs({ cat }: { cat?: CategoryResponse }) {
  return (
    <div className="mb-4">
      <Link
        className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
        href="/catalog"
      >
        All products
      </Link>
      <span className="text-lg font-bold text-emerald-900 px-2">/</span>
      {cat && cat.parent && (
        <>
          <Link
            className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
            href={`/catalog/${cat.parent.slug}`}
          >
            {cat.parent?.name}
          </Link>
          <span className="text-lg font-bold text-emerald-900 px-2">/</span>
        </>
      )}
      {cat && (
        <Link
          className=" hover:cursor-pointer hover:underline hover:underline-offset-2 text-lg font-bold text-emerald-900"
          href={cat.slug}
        >
          {cat.name}
        </Link>
      )}
    </div>
  );
}
