import { ProductResponse } from '@/app/api/types';
import { Filters, PRODUCTS_ON_PAGE, SortParams } from './CatalogService';

export function sortHelper(sortParam: SortParams, item1: ProductResponse, item2: ProductResponse) {
  if (sortParam === 'nameASC') {
    if (item1.name > item2.name) {
      return -1;
    } else if (item1.name < item2.name) {
      return 1;
    }
    return 0;
  } else if (sortParam === 'nameDESC') {
    if (item1.name < item2.name) {
      return -1;
    } else if (item1.name > item2.name) {
      return 1;
    }
    return 0;
  } else if (sortParam === 'priceASC') {
    if (item1.price > item2.price) {
      return -1;
    } else if (item1.price < item2.price) {
      return 1;
    }
    return 0;
  } else if (sortParam === 'priceDESC') {
    if (item1.price < item2.price) {
      return -1;
    } else if (item1.price > item2.price) {
      return 1;
    }
    return 0;
  } else {
    return 0;
  }
}

export function filtersHelper(filtersApplied: Filters, item: ProductResponse) {
  if (!filtersApplied.color && !filtersApplied.priceFrom && !filtersApplied.priceTo && !filtersApplied.catID)
    return true;

  return (
    (filtersApplied.catID && item.category === filtersApplied.catID) ||
    (filtersApplied.color && item.glassColor === filtersApplied.color) ||
    (filtersApplied.priceFrom && item.price >= filtersApplied.priceFrom) ||
    (filtersApplied.priceTo && item.price <= filtersApplied.priceTo)
  );
}

export function searchHelper(search: string, item: ProductResponse) {
  return item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search);
}

export function paginationHelper(page: number) {
  return [page * PRODUCTS_ON_PAGE, (page + 1) * PRODUCTS_ON_PAGE];
}
