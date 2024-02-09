import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToCartBtn from './addToCartBtn';

describe('Add to crt catalog button', () => {
  it('renders btn', () => {
    render(<AddToCartBtn inCart={0} itemId="1" />);

    const btn = screen.getByText('Add to cart');

    expect(btn).toBeInTheDocument();
  });
  it('renders btn', () => {
    render(<AddToCartBtn inCart={3} itemId="1" />);

    const btn = screen.getByText('3');

    expect(btn).toBeInTheDocument();
  });
});
