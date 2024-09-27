import { CategoryResponse, CategoryResponseData, ProductResponse, ProductResponseData } from '@/app/api/types';
import { ApiService } from '@/service/api/ApiService';

export const PRODUCTS_ON_PAGE = 12;
export const BASE_URL = 'http://localhost:3000';

export type ProductCard = {
  name: string;
  mainImage?: string;
  price?: number;
  discountedPrice?: number;
  description?: string;
  ID: string;
  key: string | undefined;
  inCart?: number;
};

export type Filters = {
  color?: string;
  catID?: string;
  priceFrom?: number;
  priceTo?: number;
};

export type SortParams = 'nameASC' | 'nameDESC' | 'priceASC' | 'priceDESC';

function sortHelper(sortParam: SortParams, item1: ProductResponse, item2: ProductResponse) {
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

function filtersHelper(filtersApplied: Filters, item: ProductResponse) {
  if (!filtersApplied.color && !filtersApplied.priceFrom && !filtersApplied.priceTo && !filtersApplied.catID)
    return true;

  return (
    (filtersApplied.catID && item.category === filtersApplied.catID) ||
    (filtersApplied.color && item.glassColor === filtersApplied.color) ||
    (filtersApplied.priceFrom && item.price >= filtersApplied.priceFrom) ||
    (filtersApplied.priceTo && item.price <= filtersApplied.priceTo)
  );
}

function searchHelper(search: string, item: ProductResponse) {
  return item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search);
}

function paginationHelper(page: number) {
  return [page * PRODUCTS_ON_PAGE, (page + 1) * PRODUCTS_ON_PAGE];
}

export default class CatalogService extends ApiService {
  public async getCategoriesArr() {
    const response = await fetch(BASE_URL + '/api/getCategories');
    let res = (await response.json()) as CategoryResponseData;
    return res;
  }

  public async getCategoryByKey(key: string) {
    const response = await fetch(`${BASE_URL}/api/getCategoryByKey/${key}`);
    let res = (await response.json()) as CategoryResponse;
    return res;
  }

  public async getProductsByFilters(filter: Filters, sort: SortParams = 'nameASC', page = 0) {
    const response = await fetch(BASE_URL + '/api/getProducts');
    let res = (await response.json()) as ProductResponseData;
    return res.filter((item) => filtersHelper(filter, item)).sort((item1, item2) => sortHelper(sort, item1, item2));
  }

  public async getProductsOnPage(filter: Filters, sort: SortParams = 'nameASC', page = 0) {
    const response = await fetch(BASE_URL + '/api/getProducts');
    let res = (await response.json()) as ProductResponseData;
    let limits = paginationHelper(page);

    return res
      .filter((item) => filtersHelper(filter, item))
      .sort((item1, item2) => sortHelper(sort, item1, item2))
      .slice(limits[0], limits[1]);
  }

  public async getProductsBySearch(filter: Filters, sort: SortParams = 'nameASC', search: string) {
    const response = await fetch(BASE_URL + '/api/getProducts');
    let res = (await response.json()) as ProductResponseData;
    return res
      .filter((item) => searchHelper(search, item))
      .filter((item) => filtersHelper(filter, item))
      .sort((item1, item2) => sortHelper(sort, item1, item2));
  }

  public async getProductById(id: string) {
    const response = await fetch(`${BASE_URL}/api/getProductById/${id}`);
    let res = (await response.json()) as ProductResponse | undefined;
    return res;
  }
}
