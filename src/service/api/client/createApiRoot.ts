import { ClientBuilder, type UserAuthOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import SessionTokenCache from '@/service/api/client/token-storage';
import getApiOptions from '@/service/api/client/config';

const createApiRoot = function (userCredentials?: UserAuthOptions) {
  const { projectKey, scopes, host, authHost, clientId, clientSecret } = getApiOptions();
  const tokenCache = new SessionTokenCache();

  let builder = new ClientBuilder();
  if (userCredentials) {
    tokenCache.set({ token: '', expirationTime: -1 });
    builder = builder.withPasswordFlow({
      host: authHost,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: userCredentials,
      },
      scopes,
      tokenCache,
    });
  } else {
    builder = builder.withAnonymousSessionFlow({
      host: authHost,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      tokenCache,
    });
  }

  return createApiBuilderFromCtpClient(
    builder.withHttpMiddleware({ host }).withLoggerMiddleware().build()
  ).withProjectKey({ projectKey });
};

export default createApiRoot;
