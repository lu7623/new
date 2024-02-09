import { TokenStore } from '@commercetools/sdk-client-v2';

export default interface SessionData {
  token?: TokenStore;
  anonymousId?: string;
  customerId?: string;
  qty?: number;
}
