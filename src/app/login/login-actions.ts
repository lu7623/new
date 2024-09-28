'use server';

import { SessionDataStorage } from '@/controller/session/server';
import { CustomerService } from '@/service/api';
import CartService from '@/service/api/CartService';

export const login = async (email: string, password: string) => {
  const customerService = new CustomerService();
  const userAuthOptions = { username: email, password: password };
  const customer = await customerService.login(userAuthOptions);

  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.token = { token: customer.token };
  sessionStorage.save(session);
};
