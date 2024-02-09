import { catList1 } from './components/searchPanel.test';
import Layout from './layout';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatalogService from '@/service/api/CatalogService';

const mockCatArr = jest.fn().mockReturnValue(catList1);
jest.mock('@/service/api/CatalogService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCategoriesArr: mockCatArr,
    };
  });
});

describe('Catalog page layout', () => {
  it('should call funcs', async () => {
    await Layout({ children: <p>Hello</p> });

    expect(CatalogService).toHaveBeenCalledTimes(1);
    expect(mockCatArr).toHaveBeenCalled();
  });
});

describe('Catalog page layout', () => {
  it('render', async () => {
    render(await Layout({ children: <p>Hello</p> }));

    const cat1 = screen.getByText('Panels');
    const child = screen.getByText('Hello');

    expect(cat1).toBeInTheDocument();
    expect(child).toBeInTheDocument();
  });
});
