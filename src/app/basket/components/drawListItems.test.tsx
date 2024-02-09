import { LineItem } from '@commercetools/platform-sdk';
import { DrawListItems } from './DrawListItems';
import { render } from '@testing-library/react';

export const lineItems: { lineItems: LineItem[] } = {
  lineItems: [
    {
      id: '345f65bb-1f1b-4f43-9db9-f5e5927acc3a',
      productId: '7ca18031-927b-4809-a66f-783cec4a47e7',
      productKey: 'blue-mirror',
      name: { 'en-US': 'Square mirror in blue frame', ru: 'Зеркало квадратное' },
      productType: {
        typeId: 'product-type',
        id: '4c576ca7-3f92-46a6-aa4e-d02ba9811e82',
      },
      productSlug: { 'en-US': 'blue-mirror', ru: 'blue-mirror' },
      variant: {
        id: 1,
        sku: 'U0020',
        key: 'U0020',
        prices: [],
        images: [{ url: '', dimensions: { h: 100, w: 100 } }],
        attributes: [],
        assets: [],
      },
      price: {
        id: '707eadc8-daa8-4e38-8e09-424ec3efc951',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 3000,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 4200,
            fractionDigits: 2,
          },
          discount: {
            id: '123456854',
            typeId: 'product-discount',
          },
        },
      },
      quantity: 2,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      addedAt: '2023-09-09T08:46:41.403Z',
      lastModifiedAt: '2023-09-09T16:03:50.986Z',
      state: [
        {
          quantity: 2,
          state: {
            id: '7777',
            typeId: 'state',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 5100,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
  ],
};

describe('Active cart lines', () => {
  it('render normally', () => {
    const screen = render(DrawListItems(lineItems));

    expect(screen.getByText('Square mirror in blue frame')).toBeInTheDocument();
  });
});
