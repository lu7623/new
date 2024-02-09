import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatalogCard from './catalogCard';
import { ProductCard } from '@/service/api/CatalogService';

const pr: ProductCard = {
  name: 'Clover suncatcher',
  mainImage: 'https://thumb.tildacdn.com/stor3132-3434-4061-b262-373130363730/-/format/webp/44175482.jpg',
  price: 1700,
  ID: 'someID',
  key: '1',
};

const pr2: ProductCard = {
  name: 'Medium heather moon',
  mainImage: 'https://thumb.tildacdn.com/stor3132-3434-4061-b262-373130363730/-/format/webp/44175482.jpg',
  price: 2500,
  discountedPrice: 2250,
  ID: 'someID',
  key: '2',
};

describe('Catalog card', () => {
  it('renders card', () => {
    render(<CatalogCard product={pr} />);

    const productName = screen.getByText('Clover suncatcher');
    const productPrice = screen.getByText('17 USD');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
  it('renders card', () => {
    render(<CatalogCard product={pr2} />);

    const productName = screen.getByText('Medium heather moon');
    const productPrice = screen.getByText('25 USD');
    const disc = screen.getByText('22.50 USD');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(disc).toBeInTheDocument();
  });
});
