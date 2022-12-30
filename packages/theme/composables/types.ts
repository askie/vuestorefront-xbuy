import {
  ProductsSearchParams
} from '@vue-storefront/core';

export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any, APP = any> {
  client: CLIENT;
  config: CONFIG;
  api: API;
  app: APP;
  [x: string]: any;
}
export interface Context<CLIENT = any, CONFIG = any, API = any, APP = any> {
  [x: string]: IntegrationContext<CLIENT, CONFIG, API, APP> | any;
}

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

export type UseFacetSearchParams = TODO;

export type UseProductSearchParams = ProductsSearchParams;

export type UseReviewSearchParams = TODO;

export type UseReviewAddParams = TODO;

export type UseShippingAddParams = TODO;

export type UseStoreFilterParams = TODO;

export type UseUserUpdateParams = TODO;

export type UseUserRegisterParams = TODO;

export type useUserOrderSearchParams = TODO;
