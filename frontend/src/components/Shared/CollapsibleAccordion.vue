<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot> Whoops, someone forget to populateme! </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
defineProps({
  header: {
    type: String,
    required: true
  }
});
const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() =>
  isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']
);

///////////// step 2
// props: {
//   header: {
//     type: String,
//     required: true
//   }
// },
// setup() {
//   const isOpen = ref(false);

//   const open = () => {
//     isOpen.value = !isOpen.value;
//   };

//   const caretIcon = computed(() =>
//     isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']
//   );

//   return { isOpen, open, caretIcon };
// }
///////////// step 1 vue2
// props: {
//   header: {
//     type: String,
//     required: true
//   }
// },
// data() {
//   return {
//     isOpen: false
//   };
// },
// computed: {
//   caretIcon() {
//     return this.isOpen ? ['fas', 'angle-up'] : ['fas', 'angle-down'];
//   }
// },
// methods: {
//   open() {
//     this.isOpen = !this.isOpen;
//   }
// }
</script>
