import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonRemoveFromCart } from './ButtonRemoveFromCart';

describe('Button "Remove from cart"', () => {
  it('contains del', () => {
    render(<ButtonRemoveFromCart lineItemId="someID" qty={12} />);

    const bttnText = screen.getByTestId('delete');

    expect(bttnText).toBeInTheDocument();
  });
});
