import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomerInfo } from './CustomerInfo';
import { IMyCustomer } from '@/service/api/CustomerService';

export const noBillingAddress: IMyCustomer = {
  email: 'test@test.com',
  password: '123456qQ',
  firstName: 'Lena',
  lastName: 'Tom',
  dateOfBirth: '1990-01-01',
  version: 1,
  addresses: [
    {
      id: '1',
      streetName: 'Baker st',
      city: 'London',
      postalCode: '12345',
      country: 'England',
    },
    {
      id: '2',
      streetName: 'St',
      city: 'Paris',
      postalCode: '12345',
      country: 'Franc',
    },
  ],
  shippingAddressIds: ['1', '2'],
  billingAddressIds: [],
};
export const noShippingAddress: IMyCustomer = {
  email: 'test@test.com',
  password: '123456qQ',
  firstName: 'Lena',
  lastName: 'Tom',
  dateOfBirth: '1990-01-01',
  version: 1,
  addresses: [
    {
      id: '1',
      streetName: 'Baker st',
      city: 'London',
      postalCode: '12345',
      country: 'England',
    },
    {
      id: '2',
      streetName: 'St',
      city: 'Paris',
      postalCode: '12345',
      country: 'Franc',
    },
  ],
  shippingAddressIds: [],
  billingAddressIds: ['1', '2'],
};
const expectedData = {
  email: 'test@test.com',
  password: '123456qQ',
  firstName: 'Lena',
  lastName: 'Tom',
  dateOfBirth: '1990-01-01',
  version: 1,
  addresses: [
    {
      id: '1',
      streetName: 'Baker st',
      city: 'London',
      postalCode: '12345',
      country: 'England',
    },
    {
      id: '2',
      streetName: 'St',
      city: 'Paris',
      postalCode: '12345',
      country: 'Franc',
    },
  ],
  shippingAddressIds: ['1'],
  billingAddressIds: ['2'],
};

jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('CustomerInfo', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('display if have Customer', () => {
    render(<CustomerInfo customer={expectedData} />);

    const firstNameField = screen.getByText('Name:');
    const lastNameField = screen.getByText('Lastname:');
    const dateOfBirthField = screen.getByText('Birthday:');
    const loginInfo = screen.getByText('Login & Security');
    const emailField = screen.getByText('Email:');
    const passwordField = screen.getByText('Password:');
    const blockPersonalInfo = screen.getByText('Personal information');
    const blockShippingAddress = screen.getByText('Shipping address');
    const blockBillingAddress = screen.getByText('Billing address');

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(dateOfBirthField).toBeInTheDocument();
    expect(loginInfo).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(blockPersonalInfo).toBeInTheDocument();
    expect(blockShippingAddress).toBeInTheDocument();
    expect(blockBillingAddress).toBeInTheDocument();
  });

  it('should render a message if there is no billing address', () => {
    const { getByText } = render(<CustomerInfo customer={noBillingAddress} />);

    let billingAddressObjects = noBillingAddress.addresses.filter((address) => {
      return noBillingAddress.billingAddressIds?.includes(address.id);
    });

    expect(billingAddressObjects).toHaveLength(0);
    expect(getByText('No matching results')).toBeVisible();
  });

  it('should render a message if there is no shipping address', () => {
    const { getByText } = render(<CustomerInfo customer={noShippingAddress} />);

    let shippingAddressObjects = noShippingAddress.addresses.filter((address) => {
      return noShippingAddress.shippingAddressIds?.includes(address.id);
    });

    expect(shippingAddressObjects).toHaveLength(0);
    expect(getByText('No matching results')).toBeVisible();
  });
  it('should not render a message if there is no shipping address', () => {
    const { getByText } = render(<CustomerInfo customer={expectedData} />);

    let shippingAddressObjects = expectedData.addresses.filter((address) => {
      return expectedData.shippingAddressIds?.includes(address.id);
    });

    expect(shippingAddressObjects).toHaveLength(1);
    expect(getByText('Shipping address')).not.toContainHTML('No matching results');
  });
  it('should not render a message if there is no billing address', () => {
    const { getByText } = render(<CustomerInfo customer={expectedData} />);

    let billingAddressObjects = expectedData.addresses.filter((address) => {
      return expectedData.shippingAddressIds?.includes(address.id);
    });

    expect(billingAddressObjects).toHaveLength(1);
    expect(getByText('Billing address')).not.toContainHTML('No matching results');
  });
});
