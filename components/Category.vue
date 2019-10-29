<template>
  <div>category</div>
</template>

<script>
export default {
  name: "Category",
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.query);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
</style>