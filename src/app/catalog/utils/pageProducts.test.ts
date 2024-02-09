import CatalogService from '@/service/api/CatalogService';
import getPageProducts from './pageProducts';
import { products } from '../components/filters.test';
import CartService from '@/service/api/CartService';
import { cardsInfo } from './cards';

const mockGetProductsByFilters = jest.fn().mockReturnValue(products);
const mockGetDiscoutedProducts = jest.fn().mockReturnValue(products);
jest.mock('@/service/api/CatalogService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getProductsByFilters: mockGetProductsByFilters,
      getDiscoutedProducts: mockGetDiscoutedProducts,
    };
  });
});

const mockGetActiveCart = jest.fn().mockReturnValue({ lineItems: [] });
jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getActiveCart: mockGetActiveCart,
    };
  });
});

jest.mock('./cards', () => ({ cardsInfo: jest.fn().mockReturnValue('') }));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Invoking getPageProducts()', () => {
  it('should create CatalogService class instance', async () => {
    await getPageProducts({ filters: {}, page: 1, sort: '' });
    expect(CatalogService).toHaveBeenCalledTimes(1);
  });
  it('should call getProductsByFilters()', async () => {
    await getPageProducts({ filters: {}, page: 1, sort: '' });
    expect(mockGetProductsByFilters).toHaveBeenCalled();
  });
  it('should call getDiscoutedProducts()', async () => {
    await getPageProducts({ filters: {}, page: 1, sort: '' });
    expect(mockGetDiscoutedProducts).toHaveBeenCalledWith();
  });
  it('should create CartService class instance', async () => {
    await getPageProducts({ filters: {}, page: 1, sort: '' });
    expect(CartService).toHaveBeenCalledTimes(1);
  });
  it('should call getActiveCart()', async () => {
    await getPageProducts({ filters: {}, page: 1, sort: '' });
    expect(mockGetActiveCart).toHaveBeenCalledWith();
  });
  it('should call cardsInfo()', async () => {
    await getPageProducts({ filters: {}, page: 1, sort: '' });
    expect(cardsInfo).toHaveBeenCalledTimes(1);
    expect(cardsInfo).toHaveBeenCalledWith(products, products, []);
  });
});
