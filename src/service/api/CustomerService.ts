import { ApiService } from '@/service/api/ApiService';
import { SessionDataStorage } from '@/controller/session/server';
import { BASE_URL } from './CatalogService';
import { IData } from '@/app/registration/utils/types';

export type UserCredentials = { username: string; password: string };

export type UserResponse = { token: string };

export default class CustomerService {
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

  public async register(formData: IData) {
    const response = await fetch(BASE_URL + '/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    let res = (await response.json()) as UserResponse;
    return res;
  }

  public isLogged() {
    const { token } = new SessionDataStorage().getData();

    return !!token;
  }

  public async getUserInfo(token: string) {
    const response = await fetch(BASE_URL + '/api/getUserData', {
      method: 'POST',
      body: JSON.stringify({ Authorization: `Bearer ${token}` }),
    });
    let res = (await response.json()) as IData;
    return res;
  }
}
