<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
            class="h-8 w-1/2"
          >
            <input
              :id="jobType"
              type="checkbox"
              class="mr-3"
              v-model="selectedJobTypes"
              :value="jobType"
              @:change="selectJobTypes"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
<script setup>
import { ref, computed } from 'vue';
//import { mapState, mapActions } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const selectedJobTypes = ref([]);

const jobStore = useJobsStore();

const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);

const userStore = useUserStore();
const router = useRouter();

const selectJobTypes = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value);
  router.push({ name: 'JobResult' });
};
// export default {
//   name: 'JobFiltersSidebarJobTypes',
//   components: {
//     CollapsibleAccordion
//   },
//   data() {
//     return {
//       selectedJobTypes: []
//     };
//   },
//   computed: {
//     ...mapState(useJobsStore, [UNIQUE_JOB_TYPES])
//   },
//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
//     selectJobTypes() {
//       this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
//       this.$router.push({ name: 'JobResult' });
//     }
//   }
// };
</script>
