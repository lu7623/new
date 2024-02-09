import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import CatalogService from '@/service/api/CatalogService';
import { products } from '../components/filters.test';
import FiltersApplied from '../components/filtersApplied';
import CatalogNavPanel from '../components/navPanel';
import Pagination from '../components/pagination';
import getPageProducts from '../utils/pageProducts';

const mockGetProductsByFilters = jest.fn().mockReturnValue(products);
const mockGetCategoryByKey = jest.fn().mockReturnValue({ id: 'someID' });
jest.mock('@/service/api/CatalogService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getProductsByFilters: mockGetProductsByFilters,
      getCategoryByKey: mockGetCategoryByKey,
    };
  });
});
jest.mock('../utils/pageProducts', () => jest.fn().mockReturnValue([]));
jest.mock('../components/navPanel', () => jest.fn().mockReturnValue(''));
jest.mock('../components/filtersApplied', () => jest.fn().mockReturnValue(''));
jest.mock('../components/pagination', () => jest.fn().mockReturnValue(''));

describe('Catalog slug page', () => {
  it('should call CatalogService class & it`s method', async () => {
    await Page({ params: { slug: 'string' }, searchParams: { color: 'value' } });

    expect(CatalogService).toHaveBeenCalledTimes(1);
    expect(mockGetCategoryByKey).toHaveBeenCalled();
    expect(mockGetProductsByFilters).toHaveBeenCalled();
  });
});
