'use server';

import { CustomerService } from '@/service/api';
import { SessionDataStorage } from '@/controller/session/server';
import { IAddress, UserCredentials } from '@/service/api/CustomerService';
import { IFormInput } from './utils/types';

export const register = async (formData: IFormInput) => {
  const customerService = new CustomerService();
  const res = await customerService.register(formData);
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.token = { token: res.token };
  sessionStorage.save(session);
};
