import {
  // Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/xbuy-api';
import type {
  UseProductSearchParams as SearchParams,
  Context as XbuyContext
} from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: XbuyContext, params) => {
    console.log('Mocked: useProduct.productsSearch------------', context, params);
    return {};
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
