'use server';

import { CustomerService } from '@/service/api';
import { SessionDataStorage } from '@/controller/session/server';
import { IData } from './utils/types';

export const registration = async (formData: IData) => {
  const customerService = new CustomerService();
  const res = await customerService.register(formData);
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.token = { token: res.token };
  sessionStorage.save(session);
};
