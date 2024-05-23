<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_ORGANISATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

const jobStore = useJobsStore();
const UNIQUE_ORGANISATIONS = computed(() => jobStore.UNIQUE_ORGANISATIONS);

const userStore = useUserStore();
</script>
