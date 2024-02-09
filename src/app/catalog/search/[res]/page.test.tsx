import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import CatalogService from '@/service/api/CatalogService';
import { cardsInfo } from '../../utils/cards';
import FiltersApplied from '../../components/filtersApplied';
import FiltersForm from '../../components/filters';
import SortForm from '../../components/sort';
import SearchHighlight from '../../components/searchHighlight';
import CartService from '@/service/api/CartService';
import { lineItems } from '@/app/basket/components/drawListItems.test';

const products = [
  {
    id: '113496b7-5958-4130-8f32-b803059297da',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '1dabd020-5a64-4d5a-9706-9ee5dfeccaab',
    },
    name: {
      'en-US': 'Square mirror in light-green frame',
      ru: 'Зеркало квадратное',
    },
    categories: [
      {
        typeId: 'category',
        id: '66993d1c-d93b-4d7f-ab52-73cb2c18e45a',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'green-mirror',
      ru: 'green-mirror',
    },
    metaTitle: {
      'en-US': 'green-mirror',
    },
    metaKeywords: {
      'en-US': 'green-mirror',
    },
    metaDescription: {
      'en-US': 'Square mirror in light-green glass frame',
      ru: 'Зеркало квадратное в раме из светло-зеленого стекла',
    },
    masterVariant: {
      id: 1,
      sku: 'U0022',
      key: 'U0022',
      prices: [
        {
          id: '5650ba8d-7d0f-4ede-87fd-b3ef619ab62f',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 3000,
            fractionDigits: 2,
          },
        },
      ],
      images: [
        {
          url: 'https://static.tildacdn.com/stor3064-3162-4033-a238-303130343766/26813283.jpg ',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
        {
          url: ' https://static.tildacdn.com/stor3731-3735-4035-a330-613161613566/23584108.jpg ',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
        {
          url: ' https://static.tildacdn.com/stor6366-3636-4339-b936-386533636638/14334147.jpg',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      attributes: [
        {
          name: 'glass-color',
          value: 'green',
        },
        {
          name: 'measures',
          value: '17x17cm',
        },
        {
          name: 'materials',
          value: 'glass, tin solder, copper foil, mirror',
        },
      ],
      assets: [],
    },
    variants: [],
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    taxCategory: {
      typeId: 'tax-category',
      id: '98d43b79-0578-4952-a93b-c22231a6751c',
    },
    createdAt: '2023-08-25T17:14:14.232Z',
    lastModifiedAt: '2023-08-25T17:14:14.232Z',
  },
  {
    id: 'd722a425-aef3-4eee-bce3-0e3829053ea8',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '1dabd020-5a64-4d5a-9706-9ee5dfeccaab',
    },
    name: {
      'en-US': 'Honeycomb wall hanging',
      ru: 'Панно медовое',
    },
    categories: [
      {
        typeId: 'category',
        id: '85db2e2f-b2bf-491f-a87a-48e446c6a73c',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'honeycomb',
      ru: 'honeycomb',
    },
    metaTitle: {
      'en-US': 'honeycomb',
    },
    metaKeywords: {
      'en-US': 'honeycomb',
    },
    metaDescription: {
      'en-US': 'Honeycomb wall hanging made of yellow and orange glass',
      ru: 'Панно из стекла в желтых оттенках в форме сот',
    },
    masterVariant: {
      id: 1,
      sku: 'U0005',
      key: 'U0005',
      prices: [
        {
          id: '36a786e9-581e-47e2-9232-0aaef27c331f',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 3300,
            fractionDigits: 2,
          },
        },
      ],
      images: [
        {
          url: 'https://static.tildacdn.com/stor3065-3634-4633-b330-643930373864/80820334.jpg ',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
        {
          url: ' https://static.tildacdn.com/stor6536-6538-4766-b233-613230313666/92812729.jpg ',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
        {
          url: ' https://static.tildacdn.com/stor6163-6665-4263-b564-386634626630/74378147.jpg',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      attributes: [
        {
          name: 'glass-color',
          value: 'yellow',
        },
        {
          name: 'measures',
          value: '21x18cm',
        },
        {
          name: 'materials',
          value: 'glass, tin solder, copper foil, herbarium',
        },
      ],
      assets: [],
    },
    variants: [],
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    taxCategory: {
      typeId: 'tax-category',
      id: '98d43b79-0578-4952-a93b-c22231a6751c',
    },
    createdAt: '2023-08-25T17:14:14.232Z',
    lastModifiedAt: '2023-08-25T17:14:14.232Z',
  },
];

const mockGetAllProductsBySearch = jest.fn().mockReturnValue(products);
const mockGetDiscoutedProducts = jest.fn().mockReturnValue(products);
jest.mock('@/service/api/CatalogService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllProductsBySearch: mockGetAllProductsBySearch,
      getDiscoutedProducts: mockGetDiscoutedProducts,
    };
  });
});

const mockGetActiveCart = jest.fn().mockReturnValue(lineItems.lineItems);
jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getActiveCart: mockGetActiveCart,
    };
  });
});
jest.mock('../../utils/cards', () => ({ cardsInfo: jest.fn().mockReturnValue('') }));

describe('Search page', () => {
  it('should call CatalogService class & it`s method', async () => {
    await Page({ params: { res: 'string' }, searchParams: { color: 'value' } });

    expect(CatalogService).toHaveBeenCalled();
    expect(mockGetAllProductsBySearch).toHaveBeenCalled();
    expect(mockGetDiscoutedProducts).toHaveBeenCalled();
  });
  it('should call CartService class & it`s method', async () => {
    await Page({ params: { res: 'string' }, searchParams: { color: 'value' } });

    expect(CartService).toHaveBeenCalled();
    expect(mockGetActiveCart).toHaveBeenCalled();
  });
});
