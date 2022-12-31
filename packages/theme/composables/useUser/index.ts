import {
  ref,
  readonly,
  computed,
  useContext
} from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import type {
  UseUserInterface,
  UseUserErrors
  // UseUserLoadParams,
  // UseUserLoginParams,
  // UseUserLogoutParams,
  // UseUserRegisterParams,
  // UseUserUpdateUserParams,
  // UseUserChangePasswordParams,
} from './useUser';

import { useCustomerStore } from '~/stores/customer';

/**
 * Allows loading and manipulating data of the current user.
 *
 * See the {@link UseUserInterface} for a list of methods and values available in this composable.
 */
export function useUser(): UseUserInterface {
  const customerStore = useCustomerStore();
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const errorsFactory = (): UseUserErrors => ({
    updateUser: null,
    register: null,
    login: null,
    logout: null,
    changePassword: null,
    load: null
  });
  const error: Ref = ref(errorsFactory());

  const setUser = (newUser: any) => {
    customerStore.setUser(newUser);
  };

  // const resetErrorValue = () => {
  //   error.value = errorsFactory();
  // };

  // const updateCustomerEmail = async (credentials: { email: string, password: string }): Promise<void> => {

  // };

  // eslint-disable-next-line consistent-return
  const updateUser = async () => {

  };

  const logout = async () => {
    console.log('logout---------');
    const customerStore = useCustomerStore();
    customerStore.setToken(null);
    customerStore.setIsLoggedIn(false);
    customerStore.setUser(null);
    // 返回首页
    app.router.push(app.localePath('/'));
  };

  const load = async () => {

  };

  // eslint-disable-next-line @typescript-eslint/require-await,no-empty-pattern
  const login = async ({ user }): Promise<void> => {
    try {
      loading.value = true;
      const { username, password } = user;
      const res = await app.$vsf.$xbuy.api.customLogin({ username, password });
      // console.log('收到登录结果：', res);

      if (res && res.data && res.data.token) {
        const customerStore = useCustomerStore();
        customerStore.setToken(res.data.token);
        customerStore.setIsLoggedIn(true);
      } else {
        throw new Error(res.message);
      }
      error.value.login = null;
    } catch (err) {
      error.value.login = err;
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const register = async ({ user }): Promise<void> => {
    try {
      loading.value = true;
      const res = await app.$vsf.$xbuy.api.customRegister(user);
      console.log('注册结果：', res);

      if (res && res.data && res.data.member_id) {
        // 自动登录
        await login({ user: { username: user.email, password: user.password } });
      } else {
        throw new Error(res.message);
      }
      error.value.register = null;
    } catch (err) {
      error.value.register = err;
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const changePassword = async () => {

  };

  return {
    setUser,
    updateUser,
    register,
    login,
    logout,
    changePassword,
    load,
    loading: readonly(loading),
    error: readonly(error),
    user: computed(() => customerStore.user),
    isAuthenticated: computed(() => customerStore.isLoggedIn)
  };
}

export default useUser;
export * from './useUser';
