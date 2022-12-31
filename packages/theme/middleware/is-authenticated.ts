// import { Logger } from '@vue-storefront/core';

import { Middleware } from '@nuxt/types';

const middleware: Middleware = (context) => {
  if (!context.app.$vsf.$xbuy.config.state.isLoginedIn()) {
    const homepage = context.localeRoute({ name: 'home' });
    context.redirect(homepage);
  }
};
export default middleware;
