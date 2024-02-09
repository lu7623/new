'use server';

import CatalogService, { Filters, PRODUCTS_ON_PAGE, SortParams } from '@/service/api/CatalogService';
import { cardsInfo } from '../utils/cards';
import CartService from '@/service/api/CartService';

export default async function getPageProducts({
  page,
  filters,
  sort,
}: {
  page: number;
  filters: Filters;
  sort: SortParams | '';
}) {
  const catalogService = new CatalogService();
  const products = await catalogService.getProductsByFilters(filters, sort, PRODUCTS_ON_PAGE, page);
  const discountedProd = await catalogService.getDiscoutedProducts();
  const cartService = new CartService();
  const productsInCart = (await cartService.getActiveCart()).lineItems;
  return cardsInfo(products, discountedProd, productsInCart);
}
