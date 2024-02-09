import CartService from '@/service/api/CartService';
import { addToCart, removeFromCart } from './addToCart';

const mockAddProductToCart = jest.fn();
const mockGetActiveCart = jest.fn().mockReturnValue({ lineItems: [] });
const mockRemoveProductFromCart = jest.fn();

jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addProductToCart: mockAddProductToCart,
      getActiveCart: mockGetActiveCart,
      removeProductFromCart: mockRemoveProductFromCart,
    };
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Add to cart utility', () => {
  it('should create CartService class` instance', () => {
    addToCart('cartID');
    expect(CartService).toHaveBeenCalledTimes(1);
  });
  it('should call addProductToCart() with correct args', () => {
    addToCart('cartID');
    expect(mockAddProductToCart).toHaveBeenCalledWith('cartID', 1);
  });
});

describe('Remove from cart utility', () => {
  it('should create CartService class` instance', () => {
    removeFromCart('cartID');
    expect(CartService).toHaveBeenCalledTimes(1);
  });
  it('should call getActiveCart() with correct args', () => {
    removeFromCart('cartID');
    expect(mockGetActiveCart).toHaveBeenCalledTimes(1);
    expect(mockGetActiveCart).toHaveBeenCalledWith();
  });
  it('should call removeProductFromCart() with no args if there are no lineItems', async () => {
    await removeFromCart('cartID');
    expect(mockRemoveProductFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveProductFromCart).toHaveBeenCalledWith('', 1);
  });
  it('should call removeProductFromCart() with correct args if there are lineItems', async () => {
    mockGetActiveCart.mockReturnValue({ lineItems: [{ productId: 'cartID', id: 'someID' }] });

    await removeFromCart('cartID');
    expect(mockRemoveProductFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveProductFromCart).toHaveBeenCalledWith('someID', 1);
  });
});
