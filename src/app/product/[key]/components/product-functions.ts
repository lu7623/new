import CatalogService from '@/service/api/CatalogService';
import { ProductProjection } from '@commercetools/platform-sdk';

export async function getProductById(id: string) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjById(id);
  const discount = await catalogService.getDiscoutProductById(id);
  return { product, discount };
}

export async function getProductByKey(key: string) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductObjByKey(key);
  const discount = await catalogService.getDiscoutProduct(key);
  if (product.length === 1) {
    return { product: product[0], discount };
  } else if (product.length === 0) throw new Error('There is no variants with such parameters');
  else if (product.length > 1) throw new Error('There are more than one variant with such parameters');
}
