import { defineStore } from 'pinia';

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES';
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES';

export interface UserState {
  isLoggedIn: boolean;
  selectedOrganisations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganisations: [],
    selectedJobTypes: [],
    selectedDegrees: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    logoutUser() {
      this.isLoggedIn = false;
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
      this.selectedOrganisations = organizations;
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes;
    },
    [ADD_SELECTED_DEGREES](degrees: string[]) {
      this.selectedDegrees = degrees;
    }
  }
});
