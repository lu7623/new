import { fireEvent, render, screen } from '@testing-library/react';
import PaginationBtn from './paginationBtn';

const handleSubmit = jest.fn((e) => e.preventDefault());
describe('Pagination button', () => {
  it('renders correct button', () => {
    render(<PaginationBtn submitFunc={handleSubmit} clickFunc={() => {}} img=">>" />);

    const btn = screen.getByText('>>');
    fireEvent.click(btn);

    expect(btn).toBeInTheDocument();
    expect(handleSubmit).toBeCalled();
  });
});
