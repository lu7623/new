import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loading spinner', () => {
  it('renders loader', () => {
    render(<Loader size={40} />);

    const loader = screen.getByAltText('loading');

    expect(loader).toBeInTheDocument();
  });
});
