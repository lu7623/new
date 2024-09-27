import { ProductResponseData } from '@/app/api/types';

export default function minMaxPrice(prods: ProductResponseData) {
  const prices = prods.map((p) => p.price / 100);
  return [Math.min(...prices), Math.max(...prices)];
}
