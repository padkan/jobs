import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('keeps track of if user is logged in', () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it('stores organisations that the user would like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedOrganisations).toEqual([]);
  });

  it('stores job types that the user like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it('stores degrees that the user like to filterjobs by', () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it('stores user search term for skills and qualifications', () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toEqual('');
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  //user managment actions
  describe('LOGIN_USER', () => {
    it('log the user in', () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe('LOGOUT_USER', () => {
    it('logout the user', () => {
      const store = useUserStore();
      store.isLoggedIn = true;
      store.LOGOUT_USER();
      expect(store.isLoggedIn).toBe(false);
    });
  });

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(['org1', 'org2']);
      expect(store.selectedOrganisations).toEqual(['org1', 'org2']);
    });
  });
  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job type the user has chosen to filter jobs by ', () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time']);
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time']);
    });
  });

  describe('ADD_SELECTED_DEGREES', () => {
    it('updates Degreees the user has chosen to filter jobs by ', () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Bachlor's", "Master's"]);
      expect(store.selectedDegrees).toEqual(["Bachlor's", "Master's"]);
    });
  });

  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore();
      store.selectedDegrees = ['Random degree'];
      store.selectedJobTypes = ['Random job type'];
      store.selectedOrganisations = ['Random organisation'];
      store.skillsSearchTerm = 'Vue';

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();
      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganisations).toEqual([]);
      expect(store.skillsSearchTerm).toEqual('');
    });
  });

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('received search term for skills the user has enterned', () => {
      const store = useUserStore();
      store.skillsSearchTerm = '';
      store.UPDATE_SKILLS_SEARCH_TERM('Vue');
      expect(store.skillsSearchTerm).toBe('Vue');
    });
  });
});
