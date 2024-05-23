import { defineStore } from 'pinia';
import { ref } from 'vue';

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES';
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES';
export const CLEAR_USER_JOB_FILTER_SELECTIONS =
  'CLEAR_USER_JOB_FILTER_SELECTIONS';

// export interface UserState {
//   isLoggedIn: boolean;
//   selectedOrganisations: string[];
//   selectedJobTypes: string[];
//   selectedDegrees: string[];
// }
export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const selectedOrganisations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);
  const skillsSearchTerm = ref<string>('');

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };

  const LOGOUT_USER = () => {
    isLoggedIn.value = false;
  };

  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganisations.value = organizations;
  };

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };

  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };

  const UPDATE_SKILLS_SEARCH_TERM = (term: string) => {
    skillsSearchTerm.value = term;
  };

  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganisations.value = [];
    skillsSearchTerm.value = '';
  };

  return {
    isLoggedIn,
    selectedOrganisations,
    selectedJobTypes,
    selectedDegrees,
    skillsSearchTerm,
    LOGIN_USER,
    LOGOUT_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    UPDATE_SKILLS_SEARCH_TERM,
    CLEAR_USER_JOB_FILTER_SELECTIONS
  };
});

// export const useUserStore = defineStore('user', {
//   state: (): UserState => ({
//     isLoggedIn: false,
//     selectedOrganisations: [],
//     selectedJobTypes: [],
//     selectedDegrees: []
//   }),
//   actions: {
//     loginUser() {
//       this.isLoggedIn = true;
//     },
//     logoutUser() {
//       this.isLoggedIn = false;
//     },
//     [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
//       this.selectedOrganisations = organizations;
//     },
//     [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
//       this.selectedJobTypes = jobTypes;
//     },
//     [ADD_SELECTED_DEGREES](degrees: string[]) {
//       this.selectedDegrees = degrees;
//     },
//     [CLEAR_USER_JOB_FILTER_SELECTIONS]() {
//       this.selectedDegrees = [];
//       this.selectedJobTypes = [];
//       this.selectedOrganisations = [];
//     }
//   }
// });
