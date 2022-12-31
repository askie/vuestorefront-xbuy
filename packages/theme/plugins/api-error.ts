import type { Plugin } from '@nuxt/types';
import useUiNotification from '~/composables/useUiNotification';

const plugin: Plugin = ({ app }) => {
  // 遇到错误时，发出通知
  app.$vsf.$xbuy.client.interceptors.response.use((res) => {
    // console.log('res.....', res);
    // eslint-disable-next-line eqeqeq
    if (res.data && res.data.code != 0) {
      console.log('api错误 ', res.data);
      const notify = useUiNotification();
      notify.send({
        message: res.data.message,
        // action: { text: string; onClick: (...args: any) => void };
        type: 'danger'
        // icon: string;
        // persist: boolean;
        // id: symbol;
        // dismiss: () => void;
      });
    }
    return res;
  });
};

export default plugin;
