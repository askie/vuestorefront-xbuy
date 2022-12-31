import { apiClientFactory } from '@vue-storefront/core';
import type { Endpoints } from './types';
import axios from 'axios';
import * as api from './api';

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
}

const defaultSettings: ClientConfig = {
  api: '',
  client: null,
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale',
    cartCookieName: 'vsf-cart',
    customerCookieName: 'vsf-customer',
    storeCookieName: 'vsf-store'
  },
  externalCheckout: {
    enable: false
  }
};

const buildConfig = (settings: ClientConfig) => ({
  ...defaultSettings,
  ...settings
});

const init = (settings: ClientConfig): { config: ClientConfig; client: any } => {
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
  return { config, client: config.client };
};

const { createApiClient } = apiClientFactory<ClientConfig, Endpoints>({
  onCreate,
  api
});

export {
  createApiClient,
  init
};
