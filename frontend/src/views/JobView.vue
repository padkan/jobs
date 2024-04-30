<template>
  <div>job page!</div>
</template>

<script>
export default {
  name: 'JobView',
  computed: {
    curtentJobId() {
      return this.$route.params.id;
    }
  }
};
</script>
