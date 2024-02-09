import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SearchForm from './search';
import SearchHighlight from './searchHighlight';
import { ProductCard } from '@/service/api/CatalogService';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue(''),
}));

const arr: ProductCard[] = [
  {
    name: 'Frame with pressed fern',
    ID: '1',
    key: 'fern-frame',
  },
];

describe('Search res ', () => {
  it('highlight search res', () => {
    render(<SearchHighlight res="fern" list={arr} />);

    const fern = screen.getByText('fern');

    expect(fern).toHaveClass('bg-yellow-200');
  });
});
