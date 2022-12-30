import { defineStore } from 'pinia';

interface ConfigState {
  stores: string,
}

export const useConfigStore = defineStore('magentoConfig', {
  state: (): ConfigState => ({
    stores: ''
  }),
  actions: {
    setStore(store: string) {
      this.stores = store;
    }
  }
});
