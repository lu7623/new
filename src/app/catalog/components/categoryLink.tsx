import Link from 'next/link';
import { CategoryResponse } from '@/app/api/types';

export default function CategoryLink({ item }: { item: CategoryResponse }) {
  const link = `/catalog/${item.slug}`;
  return item.children ? (
    <>
      <Link href={link} className="hover:opacity-75 my-1 hover:-translate-y-0.5 sm:text-base text-sm">
        {item.name}
      </Link>
      <ul>
        {item.children.map((x) => (
          <CategoryLink item={x} key={x.name} />
        ))}
      </ul>
    </>
  ) : (
    <li className={item.parent ? 'ml-3' : ''} key={item.name}>
      <Link href={link} className="hover:opacity-75 my-1 hover:-translate-y-0.5 sm:text-base text-sm">
        {item.name}
      </Link>
    </li>
  );
}
