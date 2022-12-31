import type { Plugin } from '@nuxt/types';
// import type { UiNotification } from '~/composables/useUiNotification';
import { useCustomerStore } from '~/stores/customer';

const plugin: Plugin = ({ $pinia, app }) => {
  const customerStore = useCustomerStore($pinia);
  // if (app.$vsf.$xbuy.config.state.getCustomerToken()) {
  //   customerStore.setIsLoggedIn(true);
  // }

  // 已登录时，自动在header中加入token
  app.$vsf.$xbuy.client.interceptors.request.use((req) => {
    console.log('req.....', req);
    const token = customerStore.token;
    if (token) {
      req.headers.authorization = 'Bearer ' + token;
    }
    // customerStore.setIsLoggedIn(false);
    // customerStore.setToken(null);

    // app.$vsf.$xbuy.config.state.removeCustomerToken();
    // app.$vsf.$xbuy.config.state.removeCartId();
    // app.$vsf.$xbuy.config.state.setMessage<UiNotification>({
    //   id: Symbol(''),
    //   message: app.i18n.t('You are not authorized, please log in.') as string,
    //   type: 'warning',
    //   icon: null,
    //   persist: true,
    //   title: null,
    // });

    // app.router.push(app.localePath('/'));

    return req;
  });

  // 遇到401请求时，需要这里拦截并清理token和登录态
  app.$vsf.$xbuy.client.interceptors.response.use((res) => {
    console.log('res.....', res);
    // customerStore.setIsLoggedIn(false);
    // customerStore.setToken(null);

    // app.$vsf.$xbuy.config.state.removeCustomerToken();
    // app.$vsf.$xbuy.config.state.removeCartId();
    // app.$vsf.$xbuy.config.state.setMessage<UiNotification>({
    //   id: Symbol(''),
    //   message: app.i18n.t('You are not authorized, please log in.') as string,
    //   type: 'warning',
    //   icon: null,
    //   persist: true,
    //   title: null,
    // });

    // app.router.push(app.localePath('/'));

    return res;
  });
};

export default plugin;
