'use server';

import CustomerService, {
  ChangeAction,
  ChangeAddresAction,
  ChangeEmail,
  IMyAddress,
  IMyCustomer,
  UpdateAction,
} from '@/service/api/CustomerService';
import { Customer } from '@commercetools/platform-sdk';
import { login } from '../login/login-actions';

export const returnCustomerData = (newCustomer: Customer | undefined) => {
  if (newCustomer) {
    const myCustomer: IMyCustomer = {
      email: newCustomer.email,
      password: newCustomer.password,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      dateOfBirth: newCustomer.dateOfBirth,
      version: newCustomer.version,
      addresses: newCustomer.addresses.map((address: any) => ({
        id: address.id,
        key: address.key,
        streetName: address.streetName,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      })),
      shippingAddressIds: newCustomer.shippingAddressIds,
      billingAddressIds: newCustomer.billingAddressIds,
    };
    return myCustomer;
  }
};

export const getUserInfo = async () => {
  const customerService = new CustomerService();
  const customer = await customerService.getCurrentCustomer();
  const result = returnCustomerData(customer);
  return result;
};

export const logout = () => {
  const customerService = new CustomerService();
  customerService.logout();
};

export const userIsLogged = () => {
  const customerServices = new CustomerService();
  return customerServices.isLogged();
};
