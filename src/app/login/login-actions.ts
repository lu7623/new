'use server';

import { SessionDataStorage } from '@/controller/session/server';
import { CustomerService } from '@/service/api';

export const login = async (email: string, password: string) => {
  const customerService = new CustomerService();
  const userAuthOptions = { username: email, password: password };
  const res = await customerService.login(userAuthOptions);

  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.token = { token: res.token };
  sessionStorage.save(session);
};
