
import { Context } from '@vue-storefront/core';
type getProductParams = {
    id?: string;
    catId?: string;
    limit?: string;
}
type getProductResponse = {
    data: any;
}

export async function getProduct(context: Context, params: getProductParams): Promise<getProductResponse> {
  console.log(11111, context.config, params);
  // Create URL object containing full endpoint URL
  const url = new URL('/mall/good/list', context.config.api.url);

  // Add parameters passed from composable as query strings to the URL
  params.id && url.searchParams.set('id', params.id);
  params.catId && url.searchParams.set('catId', params.catId);
  params.limit && url.searchParams.set('limit', params.limit);

  // Use axios to send a GET request
  const { data } = await context.client.post(url.href);

  // Return data from the API
  return data;
}
