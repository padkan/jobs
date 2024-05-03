import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    }
  }
});
export default useUserStore;
