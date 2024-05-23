<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organisation in UNIQUE_ORGANISATIONS"
            :key="organisation"
            class="h-8 w-1/2"
          >
            <input
              :id="organisation"
              type="checkbox"
              class="mr-3"
              v-model="selectedOrganisations"
              :value="organisation"
              @:change="selectOrganisation"
            />
            <label :for="organisation">{{ organisation }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
//import { mapState, mapActions } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { useUserStore } from '@/stores/user';

const selectedOrganisations = ref([]);

const jobStore = useJobsStore();
const UNIQUE_ORGANISATIONS = computed(() => jobStore.UNIQUE_ORGANISATIONS);

const userStore = useUserStore();
const router = useRouter();

const selectOrganisation = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganisations.value);
  router.push({ name: 'JobResult' });
};

// export default {
//   name: 'JobFiltersSidebarOrganizations',
//   components: {
//     CollapsibleAccordion
//   },
//   data() {
//     return {
//       selectedOrganisations: []
//     };
//   },
//   computed: {
//     ...mapState(useJobsStore, [UNIQUE_ORGANISATIONS])
//   },
//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
//     selectOrganisation() {
//       this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganisations);
//       this.$router.push({ name: 'JobResult' });
//     }
//   }
// };
</script>
