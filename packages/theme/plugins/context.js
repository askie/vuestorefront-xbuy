// 该文件用于想$vsf上下文扩展参数 https://docs.vuestorefront.io/v2/architecture/application-context.html
import { integrationPlugin } from '@vue-storefront/core';
import { useCustomerStore } from '~/stores/customer';

export default integrationPlugin(({
  integration
  // Other properties from Nuxt.js context like `app`, `route`, `res`, `req`, etc.
}) => {
  // console.log('aaaa', app);
  const customer = useCustomerStore();
  // console.log('cccc', customer.token);

  const configuration = {
    state: {
      isLoginedIn: () => {
        // console.log('eeee', customer.token);
        return customer.isLoggedIn;
      },
      getCustomerToken: () => {
        // console.log('eeee', customer.token);
        return customer.token;
      },
      setCustomerToken: (token) => {
        // console.log('setCustomerToken', token);
        customer.setToken(token);
        customer.setIsLoggedIn(true);
      }
    }
  };

  // Replace `<INTEGRATION_NAME>` with unique name or abbreviation
  integration.configure('xbuy', configuration);
});
