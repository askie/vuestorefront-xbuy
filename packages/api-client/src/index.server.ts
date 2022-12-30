import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import axios from 'axios';
import { getProduct } from './api/getProduct';
import { Login } from './api/user/login';

const init = (settings: Setttings): any => {
  const client = axios.create({
    baseURL: settings.api.url
  });

  return {
    config: settings,
    client
  };
};

function onCreate(settings: Setttings): any {
  if (!settings?.client) {
    return init(settings);
  }

  return {
    config: settings,
    client: settings.client
  };
}

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {
    getProduct,
    Login
  }
});

export {
  createApiClient,
  init
};
