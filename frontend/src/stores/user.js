import { defineStore } from 'pinia';

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrganisations: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    logoutUser() {
      this.isLoggedIn = false;
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations) {
      this.selectedOrganisations = organizations;
    }
  }
});
