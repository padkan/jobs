<template>
  <button :class="buttonClass">
    <!-- v-on: -> @ lint to add action on v-on:click=""-->
    {{ text }}
  </button>
</template>
<script lang="ts" setup>
import { computed, toRefs } from 'vue';
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'primary',
    validator(value: string) {
      return ['primary', 'secondary'].includes(value);
    }
  }
});
const { type } = toRefs(props);
const buttonClass = computed(() => {
  return {
    [type.value]: true
  };
});

// export default {
//   name: 'ActionButton',
//   props: {
//     text: {
//       type: String,
//       required: true
//     },
//     type: {
//       type: String,
//       required: false,
//       default: 'primary',
//       validator(value) {
//         return ['primary', 'secondary'].includes(value);
//       }
//     }
//   },
//   setup(props) {
//     const { type } = toRefs(props);
//     const buttonClass = computed(() => {
//       return {
//         [type.value]: true
//       };
//     });
//     return { buttonClass };
//   }
// computed: {
//   buttonClass() {
//     return {
//       // primary: this.type === 'primary',
//       // secondary: this.type === 'secondary'
//       [this.type]: true
//     };
//   }
// }

//};
</script>
<style scoped>
button {
  @apply px-5 py-3 font-medium;
}
.primary {
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}
.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
