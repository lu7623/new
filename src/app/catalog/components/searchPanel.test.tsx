import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue(''),
}));

import SearchPanel from './searchPanel';
import { Category } from '@commercetools/platform-sdk';
import { categoriesList } from '../utils/categories';

export const catList1: Category[] = [
  {
    id: '85db2e2f-b2bf-491f-a87a-48e446c6a73c',
    version: 2,
    createdAt: '2023-08-06T15:46:03.275Z',
    lastModifiedAt: '2023-08-21T20:41:12.018Z',
    key: 'panels',
    name: {
      'en-US': 'Panels',
      ru: 'Панно',
    },
    slug: {
      'en-US': 'panels',
      ru: 'panels',
    },
    description: {
      'en-US': 'Stained glass panels',
      ru: 'Витражные панно',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
      },
    ],
    parent: {
      typeId: 'category',
      id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    },
    orderHint: '0.2',
    metaTitle: {
      'en-US': 'Panels',
      ru: 'Панно',
    },
    metaDescription: {
      'en-US': 'Stained glass panels',
      ru: 'Витражные панно',
    },
    assets: [],
  },
  {
    id: 'b5d781c1-0a09-478f-9656-0bf5f129911d',
    version: 1,
    createdAt: '2023-08-06T15:48:21.274Z',
    lastModifiedAt: '2023-08-06T15:48:21.274Z',
    key: 'suncatcher',
    name: {
      'en-US': 'Suncatchers',
      ru: 'Ловцы света',
    },
    slug: {
      'en-US': 'suncatchers',
      ru: 'suncatchers',
    },
    description: {
      'en-US': 'Stained glass window hangings',
      ru: 'Ловцы света',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
      },
    ],
    parent: {
      typeId: 'category',
      id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    },
    orderHint: '0.15',
    metaTitle: {
      'en-US': 'Suncatchers',
      ru: 'Ловцы света',
    },
    metaDescription: {
      'en-US': 'Stained glass window hangings',
      ru: 'Ловцы света',
    },
    assets: [],
  },
  {
    id: '097f75c4-23e1-4d1f-bbf1-85dc895dab7c',
    version: 2,
    createdAt: '2023-08-06T15:51:50.361Z',
    lastModifiedAt: '2023-08-18T14:57:41.749Z',
    key: 'herbarium',
    name: {
      'en-US': 'Herbarium decor',
      ru: 'Изделия с гербарием',
    },
    slug: {
      'en-US': 'herbarium-decor',
      ru: 'herbarium',
    },
    description: {
      'en-US': 'Items with pressed flowers',
      ru: 'Изделия с гербарием',
    },
    ancestors: [],
    orderHint: '0.5',
    metaTitle: {
      'en-US': 'Herbarium decor',
      ru: 'Изделия с гербарием',
    },
    metaDescription: {
      'en-US': 'Items with pressed flowers',
      ru: 'Изделия с гербарием',
    },
    assets: [],
  },
];

const catList2: Category[] = [
  {
    id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    version: 1,
    createdAt: '2023-08-06T15:43:53.322Z',
    lastModifiedAt: '2023-08-06T15:43:53.322Z',
    key: 'hangings',
    name: {
      'en-US': 'Glass hangings',
      ru: 'Подвески и панно',
    },
    slug: {
      'en-US': 'hangings',
      ru: 'hangings',
    },
    description: {
      'en-US': 'Stained glass wall and window hangings',
      ru: 'Витражные панно и подвески',
    },
    ancestors: [],
    orderHint: '0.1',
    metaTitle: {
      'en-US': 'Glass hangings',
      ru: 'Подвески и панно',
    },
    metaDescription: {
      'en-US': 'Stained glass wall and window hangings',
      ru: 'Витражные панно и подвески',
    },
    assets: [],
  },
  {
    id: '85db2e2f-b2bf-491f-a87a-48e446c6a73c',
    version: 2,
    createdAt: '2023-08-06T15:46:03.275Z',
    lastModifiedAt: '2023-08-21T20:41:12.018Z',

    key: 'panels',
    name: {
      'en-US': 'Panels',
      ru: 'Панно',
    },
    slug: {
      'en-US': 'panels',
      ru: 'panels',
    },
    description: {
      'en-US': 'Stained glass panels',
      ru: 'Витражные панно',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
      },
    ],
    parent: {
      typeId: 'category',
      id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    },
    orderHint: '0.2',
    metaTitle: {
      'en-US': 'Panels',
      ru: 'Панно',
    },
    metaDescription: {
      'en-US': 'Stained glass panels',
      ru: 'Витражные панно',
    },
    assets: [],
  },
  {
    id: 'b5d781c1-0a09-478f-9656-0bf5f129911d',
    version: 1,
    createdAt: '2023-08-06T15:48:21.274Z',
    lastModifiedAt: '2023-08-06T15:48:21.274Z',
    key: 'suncatcher',
    name: {
      'en-US': 'Suncatchers',
      ru: 'Ловцы света',
    },
    slug: {
      'en-US': 'suncatchers',
      ru: 'suncatchers',
    },
    description: {
      'en-US': 'Stained glass window hangings',
      ru: 'Ловцы света',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
      },
    ],
    parent: {
      typeId: 'category',
      id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    },
    orderHint: '0.15',
    metaTitle: {
      'en-US': 'Suncatchers',
      ru: 'Ловцы света',
    },
    metaDescription: {
      'en-US': 'Stained glass window hangings',
      ru: 'Ловцы света',
    },
    assets: [],
  },
];

describe('Search panel', () => {
  it('renders categories list', () => {
    const list = categoriesList(catList1);
    render(<SearchPanel categoriesList={list} />);

    const cat1 = screen.getByText('Herbarium decor');
    const cat2 = screen.getByText('Panels');
    const cat3 = screen.getByText('Suncatchers');

    expect(cat1).toBeInTheDocument();
    expect(cat2).toBeInTheDocument();
    expect(cat3).toBeInTheDocument();
  });
  it('renders categories list 2', () => {
    const list = categoriesList(catList2);
    render(<SearchPanel categoriesList={list} />);

    const cat1 = screen.getByText('Glass hangings');
    const cat2 = screen.getByText('Panels');
    const cat3 = screen.getByText('Suncatchers');

    expect(cat1).toBeInTheDocument();
    expect(cat2).toBeInTheDocument();
    expect(cat3).toBeInTheDocument();
  });
});
