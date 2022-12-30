import { apiClientFactory, ApiClientExtension } from '@vue-storefront/core';
import type { Endpoints } from './types';
import axios from 'axios';
import { getProduct } from './api/getProduct';
import { login } from './api/user/login';

type ConfigState = {
  getCartId(): string;
  setCartId(id?: string | null): void;
  removeCartId(): void;
  getCustomerToken(): string;
  setCustomerToken(token?: string | null): void;
  removeCustomerToken(): void;
  getStore(): string;
  setStore(id?: string | null): void;
  removeStore(): void;
  getCurrency(): string;
  setCurrency(id?: string | null): void;
  removeCurrency(): void;
  getLocale(): string;
  setLocale(id?: string | null): void;
  removeLocale(): void;
  getCountry(): string;
  setCountry(id?: string | null): void;
  removeCountry(): void;
  getMessage<T>(): T;
  setMessage<T>(id?: T | null): void;
  removeMessage(): void;
};

interface ClientConfig {
  client: any;
  api: any;
  cookies: {
    currencyCookieName: string;
    countryCookieName: string;
    localeCookieName: string;
    cartCookieName: string;
    customerCookieName: string;
    storeCookieName: string;
  },
  externalCheckout: {
    enable: boolean;
  };
  state: ConfigState;
}

const defaultSettings: ClientConfig = {
  api: '',
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale',
    cartCookieName: 'vsf-cart',
    customerCookieName: 'vsf-customer',
    storeCookieName: 'vsf-store'
  },
  state: {
    getCartId: () => '',
    setCartId: () => { },
    getCustomerToken: () => '',
    setCustomerToken: () => { },
    getStore: () => '',
    setStore: () => { },
    getCurrency: () => '',
    setCurrency: () => { },
    getLocale: () => '',
    setLocale: () => { },
    getCountry: () => '',
    setCountry: () => { },
    setMessage: () => { },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getMessage: () => ({})
  },
  externalCheckout: {
    enable: false,
    syncUrlPath: '/vue/cart/sync',
    stores: {},
    cmsUrl: ''
  }
};

const buildConfig = (settings: any) => ({
  ...defaultSettings,
  ...settings,
  state: settings.state || defaultSettings.state
});

const init = (settings: ClientConfig): any => {
  const config = buildConfig(settings);

  if (config.client) {
    return {
      client: config.client,
      config
    };
  }

  const client = axios.create({
    baseURL: config.api.url
  });

  console.log('2222222', {
    config: config,
    client
  });
  return {
    config: config,
    client
  };
};

const onCreate = (settings: ClientConfig): { config: ClientConfig; client: any } => {
  if (!settings?.client) {
    return init(settings);
  }

  const config = buildConfig(settings);

  return { config, client: settings.client };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      console.log('1111111111111111111', configuration);
      const cartCookieName: string = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;
      const customerCookieName: string = configuration.cookies?.customerCookieName || defaultSettings.cookies.customerCookieName;
      const storeCookieName: string = configuration.cookies?.storeCookieName || defaultSettings.cookies.storeCookieName;
      const currencyCookieName: string = configuration.cookies?.currencyCookieName || defaultSettings.cookies.currencyCookieName;

      return {
        ...configuration,
        state: {
          getCartId: () => req.cookies[cartCookieName],
          setCartId: (id) => {
            if (!id) {
              delete req.cookies[cartCookieName];
              return;
            }
            res.cookie(cartCookieName, JSON.stringify(id));
          },
          getCustomerToken: () => req.cookies[customerCookieName],
          setCustomerToken: (token) => {
            console.log('setCustomerToken', token);
            if (!token) {
              delete req.cookies[customerCookieName];
              return;
            }
            res.cookie(customerCookieName, JSON.stringify(token));
          },
          getStore: () => req.cookies[storeCookieName],
          setStore: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[storeCookieName];
              return;
            }
            res.cookie(storeCookieName, JSON.stringify(id));
          },
          getCurrency: () => req.cookies[currencyCookieName],
          setCurrency: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[currencyCookieName];
              return;
            }
            res.cookie(currencyCookieName, JSON.stringify(id));
          }
        }
      };
    }
  })
};

const { createApiClient } = apiClientFactory<ClientConfig, Endpoints>({
  onCreate,
  api: {
    getProduct,
    login
  },
  extensions: [tokenExtension]
});

export {
  createApiClient,
  init
};
