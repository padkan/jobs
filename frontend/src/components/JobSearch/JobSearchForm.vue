<template>
  <form
    class="border-brand-gray-3 flex h-12 w-full items-center rounded-3xl border border-solid"
    @submit.prevent="searchForJob"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="lef-0 absolute -top-10">Role</label>
        <!-- <input
          type="text"
          :value="role"
          placeholder="Software engineer"
          class="w-full mx-1 text-lg font-normal focus:outline-none"
          @input="updateRole"
        /> -->
        <!-- <input
          v-model="role"
          type="text"
          placeholder="Software engineer"
          class="w-full mx-1 text-lg font-normal focus:outline-none"
        /> -->
        <text-input id="role" v-model="role" placeholder="Software engineer" />
      </div>
      <span
        class="border-brand-gray-3 bg-brand-gray-2 flex h-full items-center border border-l border-r px-3"
        >in</span
      >
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="lef-0 absolute -top-10">Where?</label>
        <!-- <input
          type="text"
          placeholder="Munich"
          :value="location"
          class="w-full mx-1 text-lg font-normal focus:outline-none"
          @input="location = $event.target.value"
        /> -->

        <!-- <input
          v-model="location"
          type="text"
          placeholder="Munich"
          class="w-full mx-1 text-lg font-normal focus:outline-none"
        /> -->
        <text-input id="location" v-model="location" placeholder="Munich" />
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue';
import TextInput from '@/components/Shared/TextInput.vue';
export default {
  name: 'JobSearchForm',
  components: {
    ActionButton,
    TextInput
  },
  data() {
    return {
      role: '',
      location: ''
    };
  },
  methods: {
    searchForJob() {
      if (!this.role || !this.location) return;
      this.$router.push({
        name: 'JobResult',
        query: { role: this.role, location: this.location }
      });
    }
  }
};
</script>
import ActionButtonVue from './ActionButton.vue';
