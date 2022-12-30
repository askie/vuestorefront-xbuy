import type { Ref, ComputedRef } from '@nuxtjs/composition-api';

/**
 * Errors that occured in the `useUser` composable
 */
export interface UseUserErrors {
  updateUser: Error | null;
  register: Error | null;
  login: Error | null;
  logout: Error | null;
  changePassword: Error | null;
  load: Error | null;
}

/**
 * Parameters accepted by the `updateUser` method in the `useUser` composable
 */
export type UseUserUpdateUserParams = {
  user: { email?: string, password?: string }
};

/**
 * Parameters accepted by the `register` method in the `useUser` composable
 */
export type UseUserRegisterParams = {
  user: { email?: string, password?: string }

};

/**
 * Parameters accepted by the `login` method in the `useUser` composable
 */
export type UseUserLoginParams = {
  user: { recaptchaToken?: string }
};

/**
 * Parameters accepted by the `logout` method in the `useUser` composable
 */
export type UseUserLogoutParams = any;

/**
 * Parameters accepted by the `changePassword` method in the `useUser` composable
 */
export type UseUserChangePasswordParams = {
  current: string;
  new: string;
};

/**
 * Parameters accepted by the `load` method in the `useUser` composable
 */
export type UseUserLoadParams = any;

/**
 * Data and methods returned from the {@link useUser|useUser()} composable
 */
export interface UseUserInterface {

  /**
   * Overrides the `user` property with the data passed as a parameter
   */
  setUser(newUser: any): void;

  /**
   * Updates the current customer and saves the details returned from the API in the `user` property
   */
  updateUser(params: UseUserUpdateUserParams): Promise<void>;

  /**
   * Registers a new customer and saves details returned from the API in the `user` property
   */
  register(params: UseUserRegisterParams): Promise<void>;

  /**
   * Logs in the customer based on provided username and password and saves the details returned from the API in the `user` property
   */
  login(params: UseUserLoginParams): Promise<void>;

  /**
   * Logs out the current customer
   */
  logout(params: UseUserLogoutParams): Promise<void>;

  /**
   * Changes password of the current customer and saves the details returned from the API in the `user` property
   */
  changePassword(params: UseUserChangePasswordParams): Promise<void>;

  /**
   * Fetches the information about the current customer and saves results from the API in the `user` property
   */
  load(params?: UseUserLoadParams): Promise<any>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: Readonly<Ref<UseUserErrors>>;

  /**
   * Main data object populated by the `load()` method and updated by other methods in this composable
   */
  user: ComputedRef<any | null>;

  /**
   * Indicates whether the customer is authenticated or not
   */
  isAuthenticated: ComputedRef<boolean>;
}
