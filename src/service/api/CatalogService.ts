import { ProductResponse, ProductResponseData } from '@/app/api/types';
import { ApiService } from '@/service/api/ApiService';

export const PRODUCTS_MAX_COUNT = 100;
export const PRODUCTS_ON_PAGE = 12;

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
  }
}

function filtersHelper(filtersApplied: Filters, item: ProductResponse) {
  return (
    (filtersApplied.catID && item.category === filtersApplied.catID) ||
    (filtersApplied.color && item.glassColor === filtersApplied.color) ||
    (filtersApplied.priceFrom && item.price >= filtersApplied.priceFrom) ||
    (filtersApplied.priceTo && item.price <= filtersApplied.priceTo)
  );
}
export default class CatalogService extends ApiService {
  public async getCategoriesArr() {
    const categories = await this.apiRoot
      .categories()
      .get({
        queryArgs: {
          expand: ['parent'],
        },
      })
      .execute();
    return categories.body.results;
  }

  public async getCategoryByKey(key: string) {
    const categories = await this.apiRoot
      .categories()
      .withKey({ key })
      .get({
        queryArgs: {
          expand: ['parent'],
        },
      })
      .execute();
    return categories.body;
  }

  public async getProductsByFilters(filter: Filters, sort: string, limit = PRODUCTS_MAX_COUNT, page = 0) {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [
            filter.color ? `variants.attributes.glass-color:"${filter.color}"` : '',
            filter.priceFrom && filter.priceTo
              ? `variants.price.centAmount:range (${filter.priceFrom * 100} to ${filter.priceTo * 100})`
              : '',
            filter.catID ? `categories.id: subtree("${filter.catID}")` : '',
          ].filter((x) => x !== ''),
          limit: limit,
          offset: page * PRODUCTS_ON_PAGE,
          sort: [sort],
        },
      })
      .execute();
    return products.body.results;
  }

  public async getAllProductsBySearch(filter: Filters, sort: string, search?: string) {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [
            filter.color ? `variants.attributes.glass-color:"${filter.color}"` : '',
            filter.priceFrom && filter.priceTo
              ? `variants.price.centAmount:range (${filter.priceFrom * 100} to ${filter.priceTo * 100})`
              : '',
          ].filter((x) => x !== ''),
          limit: 100,
          sort: [sort],
          'text.en-US': search,
        },
      })
      .execute();
    return products.body.results;
  }

  public async getDiscoutProduct(key: string) {
    const res = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          filter: ['variants.scopedPriceDiscounted:true', `key:"${key}"`],
        },
      })
      .execute();
    const product = res.body.results[0];

    return product?.masterVariant.price?.discounted?.value.centAmount || undefined;
  }

  public async getDiscoutProductById(id: string) {
    const res = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          filter: ['variants.scopedPriceDiscounted:true', `id:"${id}"`],
        },
      })
      .execute();
    const product = res.body.results[0];

    return product?.masterVariant.price?.discounted?.value.centAmount || undefined;
  }

  public async getDiscoutedProducts() {
    const products = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          priceCurrency: 'USD',
          filter: 'variants.scopedPriceDiscounted:true',
        },
      })
      .execute();
    return products.body.results;
  }

  public async getProductObjByKey(productKey: string) {
    const product = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `key:"${productKey}"`,
        },
      })
      .execute();
    return product.body.results;
  }

  public async getProductObjById(productID: string) {
    const responseProduct = await this.apiRoot.productProjections().withId({ ID: productID }).get().execute();
    return responseProduct.body;
  }
}
