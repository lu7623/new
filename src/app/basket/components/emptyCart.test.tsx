import { render } from '@testing-library/react';
import { EmptyCart } from './emptyCart';

describe('EmptyCart component', () => {
  it('renders message', () => {
    const { getByText } = render(<EmptyCart />);
    const cartMessage = getByText('Your cart is empty!');
    expect(cartMessage).toBeInTheDocument();
  });

  it('renders button', () => {
    const { getByRole } = render(<EmptyCart />);
    const startShoppingButton = getByRole('button', { name: 'Start shopping for a great day' });
    expect(startShoppingButton).toBeInTheDocument();
  });
});
