import { defineStore } from 'pinia';

interface CustomerState {
  user: null,
  token: null,
  isLoggedIn: boolean,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    user: null,
    token: null,
    isLoggedIn: false
  }),
  actions: {
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: any) {
      this.user = user;
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
