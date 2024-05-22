<template>
  <div
    class="border-brand-grey-1 flex flex-col border-r border-solid bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>
      <!-- <job-filters-sidebar-organizations />
      <job-filters-sidebar-job-types /> -->

      <job-filters-sidebar-checkbox-group
        header="Job Type"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="useStore.ADD_SELECTED_JOB_TYPES"
      />
      <job-filters-sidebar-checkbox-group
        header="Organizations"
        :unique-values="UNIQUE_ORGANISATIONS"
        :action="useStore.ADD_SELECTED_ORGANIZATIONS"
      />
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import ActionButton from '@/components/Shared/ActionButton.vue';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

const jobStore = useJobsStore();

const UNIQUE_ORGANISATIONS = computed(() => jobStore.UNIQUE_ORGANISATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);

const useStore = useUserStore();

// export default {
//   name: 'JobFiltersSidebar',
//   components: {
//     ActionButton,
//     CollapsibleAccordion,
//     JobFiltersSidebarOrganizations,
//     JobFiltersSidebarJobTypes
//   }
// };
</script>
