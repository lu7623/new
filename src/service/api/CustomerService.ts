import createApiRoot from '@/service/api/client/createApiRoot';
import { ApiService } from '@/service/api/ApiService';
import { SessionDataStorage } from '@/controller/session/server';
import SessionTokenCache from './client/token-storage';
import ServerSessionDataStorage from '@/controller/session/server/ServerSessionDataStorage';
import { BASE_URL } from './CatalogService';

export type UserCredentials = { username: string; password: string };

export type UserResponse = { token: string };

export type UpdateAction =
  | 'setCompanyName'
  | 'setDateOfBirth'
  | 'setFirstName'
  | 'setLastName'
  | 'setLocale'
  | 'setMiddleName'
  | 'setSalutation'
  | 'setTitle'
  | 'setVatId';

export type ChangeAction =
  | 'removeAddress'
  | 'setDefaultShippingAddress'
  | 'addBillingAddressId'
  | 'addShippingAddressId'
  | 'removeBillingAddressId'
  | 'removeShippingAddressId'
  | 'setDefaultBillingAddress';

export type ChangeAddresAction = 'changeAddress' | 'addAddress';

export type ChangeEmail = 'changeEmail';

interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses: IAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
}

export interface IMyCustomer {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  version: number;
  addresses: IMyAddress[];
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
}

export interface IAddress {
  streetName?: string;
  city?: string;
  postalCode?: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

export interface IMyAddress {
  id: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

interface UpdateCustomer {
  action: UpdateAction;
  [x: string]: string;
}

interface ChangeAddressCustomer {
  action: ChangeAddresAction;
  address: IAddress;
  addressId?: string;
  addressKey?: string;
}

interface RemoveAddressCustomer {
  action: ChangeAction;
  addressId?: string;
  addressKey?: string;
}

export default class CustomerService extends ApiService {
  public async login(credentials: UserCredentials) {
    const response = await fetch(BASE_URL + '/api/authUser', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    let res = (await response.json()) as UserResponse;
    return res;
  }

  public logout() {
    new SessionDataStorage().save({});
  }

  public async getCurrentCustomer() {
    const result = await this.apiRoot.me().get().execute();
    return result.body;
  }

  public async register(
    formData: { [key: string]: string },
    formShippingAddress: IAddress,
    formBillingAddress: IAddress
  ) {
    const customerDraft: CustomerDraft = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      addresses: [
        {
          streetName: formShippingAddress.streetName,
          city: formShippingAddress.city,
          postalCode: formShippingAddress.postalCode,
          country: formShippingAddress.country,
        },
        {
          streetName: formBillingAddress.streetName,
          city: formBillingAddress.city,
          postalCode: formBillingAddress.postalCode,
          country: formBillingAddress.country,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
    };

    if (formShippingAddress.defaultShippingAddress) {
      customerDraft.defaultShippingAddress = 0;
    }
    if (formBillingAddress.defaultBillingAddress) {
      customerDraft.defaultBillingAddress = 1;
    }
    const response = await fetch(BASE_URL + '/api/register', {
      method: 'POST',
      body: JSON.stringify(customerDraft),
    });
    let res = (await response.json()) as UserResponse;
    return res;
  }

  public isLogged() {
    const { token } = new SessionDataStorage().getData();
    return !!token;
  }
}
