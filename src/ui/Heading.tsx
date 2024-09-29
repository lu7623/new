import { FC } from 'react';

export interface HeadingProps {
  title: string;
}

export const Heading: FC<HeadingProps> = ({ title }) => {
  return <h1 className="text-center uppercase mt-9 mb-5 font-serif text-emerald-900 font-bold text-2xl">{title}</h1>;
};
