import { Context, CustomQuery } from '@vue-storefront/core';
type LoginResponse = {
  token: string;
}

export async function login(context: Context, parms: CustomQuery): Promise<LoginResponse> {
  const { username, password } = parms;

  // console.log(222222, username, password);
  // Create URL object containing full endpoint URL
  const url = new URL('/mall/member/login', context.config.api.url);

  // // Add parameters passed from composable as query strings to the URL
  // url.searchParams.set('password', password);

  // Use axios to send a GET request
  const { data } = await context.client.post(url.href, { email: username, password: password });

  console.log('登录结果：', data);

  // Return data from the API
  return data;
}
