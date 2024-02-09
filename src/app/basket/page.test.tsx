import { render, screen } from '@testing-library/react';
import Page from './page';
import { DrawListItems } from './components/DrawListItems';
import CartService from '@/service/api/CartService';
import { EmptyCart } from './components/emptyCart';

const mockGetActiveCart = jest.fn();
jest.mock('./components/DrawListItems', () => ({ DrawListItems: jest.fn() }));
jest.mock('./components/emptyCart', () => ({ EmptyCart: jest.fn() }));
jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getActiveCart: mockGetActiveCart,
    };
  });
});

describe('Cart page', () => {
  it('renders header & draw lines when they exist', async () => {
    mockGetActiveCart.mockReturnValue({
      id: 'ident',
      lineItems: ['Text'],
      totalPrice: { centAmount: 500000 },
      discountCodes: [],
    });

    const Result = await Page();
    render(Result);

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(DrawListItems).toHaveBeenCalled();
  });
  it('renders header & empty cart when lines does not exist', async () => {
    mockGetActiveCart.mockReturnValue({
      id: 'ident',
      lineItems: [],
      totalPrice: { centAmount: 500000 },
      discountCodes: [],
    });

    const Result = await Page();
    render(Result);

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(EmptyCart).toHaveBeenCalled();
  });
});
