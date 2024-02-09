import { render, screen } from '@testing-library/react';
import Page from './page';
import { getUserInfo, userIsLogged } from './account-actions';
import { CustomerInfo } from './components/customerInfo/CustomerInfo';
import { LogoutButton } from './components/loggoutButton/LogoutButton';
import CartService from '@/service/api/CartService';

jest.mock('./components/loggoutButton/LogoutButton.tsx');
jest.mock('./components/customerInfo/CustomerInfo.tsx');
jest.mock('./account-actions', () => ({
  userIsLogged: jest.fn().mockReturnValue(true),
  getUserInfo: jest.fn().mockReturnValue({
    id: '4a3b5783-6d4b-45b7-9c2a-f9268a6259c9',
    version: 1,
    createdAt: '2023-07-30T16:10:42.771Z',
    lastModifiedAt: '2023-07-30T16:10:42.771Z',
    email: 'samplecustomer.germany@example.com',
    firstName: 'Sample Customer',
    lastName: 'Germany',
    addresses: [
      {
        id: 'h90i8lf2',
        firstName: 'Sample Customer',
        lastName: 'Germany',
        streetName: 'Sample Street',
        streetNumber: '1',
        postalCode: '12345',
        city: 'Sample Town',
        country: 'DE',
      },
    ],
    shippingAddressIds: [],
    billingAddressIds: [],
    isEmailVerified: false,
    key: '123456',
    stores: [],
    authenticationMode: 'ExternalAuth',
  }),
}));
const mockGetAllCarts = jest.fn().mockReturnValue({
  results: [
    { id: '1111', lineItems: ['string1', 'string2'] },
    { id: '2222', lineItems: ['string3', 'string4'] },
  ],
});
jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllCarts: mockGetAllCarts,
    };
  });
});

describe('Account page', () => {
  it('renders header', async () => {
    const Result = await Page();
    render(Result);

    expect(screen.getByText('Your Account')).toBeInTheDocument();
    expect(getUserInfo).toHaveBeenCalled();
    expect(userIsLogged).toHaveBeenCalled();
  });
});
