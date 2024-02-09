'use server';

import { CustomerService } from '@/service/api';
import { SessionDataStorage } from '@/controller/session/server';
import { IAddress, UserCredentials } from '@/service/api/CustomerService';

export const register = async (
  formData: { [key: string]: string },
  formShippingAddress: IAddress,
  formBillingAddress: IAddress
) => {
  const customerService = new CustomerService();
  const res = await customerService.register(formData, formShippingAddress, formBillingAddress);
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.customerId = res.customer.id;
  sessionStorage.save(session);
  const credentials: UserCredentials = {
    username: formData.email,
    password: formData.password,
  };
  await customerService.loginAfterRegistration(credentials);
};
