import { ComputedRef, DeepReadonly, Ref } from '@nuxtjs/composition-api';

export type CustomQuery = Record<string, string>;

export type CustomHeaders = Record<string, string>;
export declare type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

/**
 * Errors that occured in the {@link useConfig|useConfig()} composable
 */
export interface UseConfigErrors {

  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;
}

/**
 * The params object accepted by the `load` method in the {@link useConfig|useConfig()} composable
 */
export type UseConfigLoadParams = ComposableFunctionArgs<any>;

/**
 * Data and methods returned from the {@link useConfig|useConfig()} composable
 */
export interface UseConfigInterface {

  /**
   * Store configuration loaded using the `load` method
   */
  stores: ComputedRef<any>,

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>,

  /**
   * Loads store configuration
   */
  load(): Promise<void>
}
