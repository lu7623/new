import { ProductResponseData } from '@/app/api/types';

export default function AttributeList(prods: ProductResponseData) {
  const a = prods.map((p) => p.glassColor);

  let seen: string[] = [];
  return a.filter((item) => {
    if (item) return seen.includes(item) ? false : seen.push(item);
  });
}
