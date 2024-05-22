<template>
  <input
    type="text"
    :value="modelValue"
    class="focuse:outline-none w-full text-lg font-normal"
    @input="handleInput"
  />
</template>
<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);
const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
// export default {
//   name: 'TextInput',
//   props: {
//     modelValue: {
//       type: String,
//       required: true
//     }
//   },
//   emits: ['update:modelValue'],
//   methods: {
//     handleInput($event: Event) {
//       const target = $event.target as HTMLInputElement;
//       this.$emit('update:modelValue', target.value);
//     }
//   }
// };
</script>
