import { ProductResponseData } from '@/app/api/types';
import { ProductCard } from '@/service/api/CatalogService';

export function cardsInfo(prods: ProductResponseData) {
  return prods.map((p) => {
    const product: ProductCard = {
      name: p.name,
      mainImage: p.images[0],
      price: p.price,
      discountedPrice: p.discountedPrice,
      description: p.description,
      ID: p.ID,
      key: p.key,
      inCart: 0,
    };
    return product;
  });
}
