<template>
  <div
    class="border-brand-grey-1 flex flex-col border-r border-solid bg-white p-4"
  >
    <section class="pb-5">
      <!-- <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear Filters"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
          />
        </div>
      </div> -->
      <!-- <job-filters-sidebar-organizations />
      <job-filters-sidebar-job-types /> -->

      <job-filters-sidebar-prompt />
      <job-filters-sidebar-skills />

      <collapsible-accordion header="Degree">
        <job-filters-sidebar-degrees />
      </collapsible-accordion>

      <collapsible-accordion header="Job Type">
        <job-filters-sidebar-job-types />
      </collapsible-accordion>
      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </collapsible-accordion>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ActionButton from '@/components/Shared/ActionButton.vue';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue';
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue';

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';
import { useDegreesStore } from '@/stores/degrees';

//const jobStore = useJobsStore();
//const degreeStore = useDegreesStore();

//const UNIQUE_ORGANISATIONS = computed(() => jobStore.UNIQUE_ORGANISATIONS);
//const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);
//const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);

const userStore = useUserStore();
const route = useRoute();

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || '';
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
};

onMounted(parseSkillsSearchTerm);

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
useRoute,
