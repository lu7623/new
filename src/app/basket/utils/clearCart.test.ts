import CartService from '@/service/api/CartService';
import clearHandler from './clearCart';

const mockDeleteCart = jest.fn();
const mockCreateCart = jest.fn().mockReturnValue('newCartObj');
const mockUpdateCartProdsQty = jest.fn();

jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      deleteCart: mockDeleteCart,
      createCart: mockCreateCart,
      updateCartProdsQty: mockUpdateCartProdsQty,
    };
  });
});

describe('Clear cart utility', () => {
  it('should create CartService class` instance', async () => {
    clearHandler('cartID', 1);
    expect(CartService).toHaveBeenCalledTimes(1);
  });
  it('should call deleteCart() with correct args', async () => {
    clearHandler('cartID', 1);
    expect(mockDeleteCart).toHaveBeenCalledWith('cartID', 1);
  });
  it('should create CartService class` instance', async () => {
    clearHandler('cartID', 1);
    expect(mockUpdateCartProdsQty).toHaveBeenCalledWith('newCartObj');
  });
});
