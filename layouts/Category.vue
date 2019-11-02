<template>
  <CommonLayout :sidebarShow="false">
    <div class="aaaaaass">category</div>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@theme/components/CommonLayout";

export default {
  name: "Category",
  components: { CommonLayout },
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log(this.$page.path);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>