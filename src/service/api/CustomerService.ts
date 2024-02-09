import createApiRoot from '@/service/api/client/createApiRoot';
import { ApiService } from '@/service/api/ApiService';
import { SessionDataStorage } from '@/controller/session/server';
import SessionTokenCache from './client/token-storage';
import ServerSessionDataStorage from '@/controller/session/server/ServerSessionDataStorage';

export type UserCredentials = { username: string; password: string };

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
    const apiRoot = createApiRoot();
    const res = await apiRoot
      .me()
      .login()
      .post({
        body: {
          email: credentials.username,
          password: credentials.password,
          activeCartSignInMode: 'MergeWithExistingCustomerCart',
        },
      })
      .execute();
    const storage = new ServerSessionDataStorage();
    const session = storage.getData();
    session.customerId = res.body.customer.id;
    storage.save(session);
    this.apiRoot = createApiRoot(credentials);
    return this.getCurrentCustomer();
  }

  public async loginAfterRegistration(credentials: UserCredentials) {
    this.apiRoot = createApiRoot(credentials);
    return this.getCurrentCustomer();
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
    const apiRoot = createApiRoot();
    const result = await apiRoot.me().signup().post({ body: customerDraft }).execute();
    return result.body;
  }

  public isLogged() {
    const { customerId } = new SessionDataStorage().getData();
    return !!customerId;
  }

  public async updateFieldName(customer: IMyCustomer, fieldName: string, actionType: UpdateAction, value?: string) {
    if (value) {
      const actionArr: UpdateCustomer = {
        action: actionType,
        [fieldName]: value,
      };
      const result = await this.apiRoot
        .me()
        .post({
          body: {
            version: customer.version,
            actions: [actionArr],
          },
        })
        .execute();
      return result.body;
    }
  }

  public async changeAddAddress(customer: IMyCustomer, actionType: ChangeAddresAction, address: IMyAddress) {
    if (customer.version) {
      const myAddress: IMyAddress = {
        id: address.id,
        country: address.country,
        city: address.city,
        streetName: address.streetName,
        postalCode: address.postalCode,
      };
      const actionArr: ChangeAddressCustomer = {
        action: actionType,
        address: myAddress,
        addressId: myAddress.id,
      };
      const result = await this.apiRoot
        .me()
        .post({
          body: {
            version: customer.version,
            actions: [actionArr],
          },
        })
        .execute();
      return result.body;
    }
  }

  public async changeEmail(customer: IMyCustomer, actionType: ChangeEmail, value: string) {
    const actionArr = {
      action: actionType,
      email: value,
    };
    const result = await this.apiRoot
      .me()
      .post({
        body: {
          version: customer.version,
          actions: [actionArr],
        },
      })
      .execute();
    return result.body;
  }

  public async changePassword(customer: IMyCustomer, newPassword: string, currentPassword: string) {
    const result = await this.apiRoot
      .me()
      .password()
      .post({
        body: {
          version: customer.version,
          currentPassword,
          newPassword,
        },
      })
      .execute();
    return result.body;
  }

  public async deleteSetAddress(customer: IMyCustomer, actionType: ChangeAction, address: IMyAddress) {
    if (customer.version) {
      const myAddress: IMyAddress = {
        id: address.id,
        country: address.country,
        city: address.city,
        streetName: address.streetName,
        postalCode: address.postalCode,
      };
      const actionArr: RemoveAddressCustomer = {
        action: actionType,
        addressId: myAddress.id,
      };
      const result = await this.apiRoot
        .me()
        .post({
          body: {
            version: customer.version,
            actions: [actionArr],
          },
        })
        .execute();
      return result.body;
    }
  }
}
