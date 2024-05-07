<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <!-- h-16 4rem 64px  text-xl 20px-->
      <div
        class="border- mx-auto flex h-full flex-nowrap border-b border-solid border-x-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl font-semibold"
          >Next Job!
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button
            v-else
            text="Sign in"
            type="primary"
            @click="loginUser"
          />
        </div>
      </div>
      <sub-nav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<!-- vue2 ->option api
vue3-> composition api  -->
<script>
import { mapActions, mapState } from 'pinia';
import useUserStore from '@/stores/user';

import ActionButton from '@/components/Shared/ActionButton.vue';
import ProfileImage from '@/components/Navigation/ProfileImage.vue';
import SubNav from '@/components/Navigation/SubNav.vue';

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    SubNav
  },
  data() {
    return {
      menuItems: [
        { text: 'Teams', url: '/teams' },
        { text: 'Locations', url: '/' },
        { text: 'Life at Next Job', url: '/' },
        { text: 'How we hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: '/jobs/results' }
      ]
    };
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']), //userStore
    headerHeightClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn
      };
    }
  },
  methods: {
    ...mapActions(useUserStore, ['loginUser'])
  }
};
</script>
