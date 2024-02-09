import { fireEvent, render } from '@testing-library/react';
import ClearCart from './clearCart';

describe('Clear cart component', () => {
  it('renders btn', () => {
    const { getByText } = render(<ClearCart cartId="" cartVersion={1} />);

    const btn = getByText('Clear cart');
    fireEvent.click(btn);
    const continueBtn = getByText('Continue');

    expect(btn).toBeInTheDocument();
    expect(continueBtn).toBeInTheDocument();
  });
});
