'use server';

import { SessionDataStorage } from '@/controller/session/server';
import { CustomerService } from '@/service/api';
import CartService from '@/service/api/CartService';

export const login = async (email: string, password: string) => {
  const customerService = new CustomerService();
  const userAuthOptions = { username: email, password: password };
  const customer = await customerService.login(userAuthOptions);
  const cartService = new CartService();
  await cartService.getActiveCart();
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.customerId = customer.id;
  sessionStorage.save(session);
};
