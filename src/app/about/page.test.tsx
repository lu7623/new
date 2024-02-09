import { fireEvent, render, screen } from '@testing-library/react';
import Page from './page';

describe('AboutUs component:', () => {
  it('should render with correct props', () => {
    const { getByText } = render(<Page />);

    expect(getByText('About US')).toBeInTheDocument();
    expect(getByText('Our collaboration')).toBeInTheDocument();
  });
});

describe('AboutUs component:', () => {
  it('should open popup', () => {
    render(<Page />);

    const person = screen.getByAltText('Lyubov Agulova');
    fireEvent.click(person);
    const text = screen.getByText('Contributions to eCommerce Application project:');

    expect(text).toBeInTheDocument();
  });
});
