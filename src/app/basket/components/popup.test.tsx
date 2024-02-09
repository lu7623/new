import { render } from '@testing-library/react';
import CartPopup from './popup';

describe('Clear cart popup', () => {
  it('renders btn', () => {
    const { getByText } = render(<CartPopup cartId="" cartVersion={1} exit={() => {}} />);

    const btn1 = getByText('Continue');
    const btn2 = getByText('Cancel');

    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
  });
});
