'use server';

import CatalogService, { Filters, PRODUCTS_ON_PAGE, SortParams } from '@/service/api/CatalogService';
import { cardsInfo } from '../utils/cards';

export default async function getPageProducts({
  page,
  filters,
  sort,
}: {
  page: number;
  filters: Filters;
  sort?: SortParams;
}) {
  const catalogService = new CatalogService();
  const products = await catalogService.getProductsOnPage(filters, sort, page);

  return cardsInfo(products);
}
