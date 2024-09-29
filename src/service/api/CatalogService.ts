import { CategoryResponse, CategoryResponseData, ProductResponse, ProductResponseData } from '@/app/api/types';
import { ApiService } from '@/service/api/ApiService';
import { filtersHelper, paginationHelper, searchHelper, sortHelper } from './helpers';

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

export default class CatalogService {
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
