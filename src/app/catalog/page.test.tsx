import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import CatalogService from '@/service/api/CatalogService';
import CatalogNavPanel from './components/navPanel';
import FiltersApplied from './components/filtersApplied';
import Pagination from './components/pagination';
import getPageProducts from './utils/pageProducts';
import { products } from './components/filters.test';

const mockGetProductsByFilters = jest.fn().mockReturnValue(products);
jest.mock('@/service/api/CatalogService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getProductsByFilters: mockGetProductsByFilters,
    };
  });
});
jest.mock('./utils/pageProducts', () => jest.fn().mockReturnValue([]));
jest.mock('./components/navPanel', () => jest.fn().mockReturnValue(''));
jest.mock('./components/filtersApplied', () => jest.fn().mockReturnValue(''));
jest.mock('./components/pagination', () => jest.fn().mockReturnValue(''));

describe('Catalog page', () => {
  it('should call CatalogService class & it`s method', async () => {
    await Page({ searchParams: { color: 'value' } });

    expect(CatalogService).toHaveBeenCalledTimes(1);
    expect(mockGetProductsByFilters).toHaveBeenCalled();
  });
});
