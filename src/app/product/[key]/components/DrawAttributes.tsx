import { ProductResponse } from '@/app/api/types';

export function DrawAttributes({ product }: { product: ProductResponse }) {
  return (
    <ul>
      <span className=" font-bold text-emerald-800">Attributes:</span>
      <li key={product.glassColor}>
        <span className="">Glass color:</span> {product.glassColor}
      </li>
      <li key={product.measures}>
        <span className="">Measures:</span> {product.measures}
      </li>
      <li key={product.materials}>
        <span className="">Materials:</span> {product.materials}
      </li>
    </ul>
  );
}
