import {
  computed, readonly, ref
} from '@nuxtjs/composition-api';
import { useConfigStore } from '@vue-storefront/xbuy-theme/stores/config';
import type { UseConfigErrors, UseConfigInterface, UseConfigLoadParams } from './useConfig';

/**
 * Allows interacting with the store configuration.
 *
 * See the {@link UseConfigInterface} for a list of methods and values available in this composable.
 */
export function useConfig(): UseConfigInterface {
  // const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseConfigErrors>({ load: null });
  const configStore = useConfigStore();
  const stores = computed(() => configStore.stores);
  // const stores = computed(() => "aaaaa");

  const load = async (params?: UseConfigLoadParams) => {
    error.value.load = null;
    loading.value = true;
    console.log('load', params);

    try {
      configStore.setStore('aaaaa');
    } catch (err) {
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    stores,
    loading: readonly(loading),
    load
  };
}

export * from './useConfig';
export default useConfig;
