import { defineStore } from 'pinia';

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES';
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrganisations: [],
    selectedJobTypes: []
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
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes) {
      this.selectedJobTypes = jobTypes;
    }
  }
});
