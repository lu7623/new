import Link from 'next/link';
import { FC } from 'react';

export interface LinkProps {
  href: string;
  title: string;
}

export const NavLink: FC<LinkProps> = ({ href, title }) => {
  return (
    <Link className="mt-9 mb-5 font-serif text-emerald-900 font-bold underline decoration-2 text-l" href={href}>
      {title}
    </Link>
  );
};
