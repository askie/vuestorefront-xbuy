import { defineStore } from 'pinia';

interface CustomerState {
  token: null,
  isLoggedIn: boolean,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    token: null,
    isLoggedIn: false
  }),
  actions: {
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },
    setToken(token: string) {
      this.token = token;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      // { storage: sessionStorage, paths: ['firstName', 'lastName'] },
      { key: 'customer' }
    ]
  }
});
