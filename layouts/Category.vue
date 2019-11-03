<template>
  <CommonLayout :sidebarShow="false">
    <div class="aaaaaass">{{getPath}}</div>
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
  computed: {
    getPath() {
      console.log(this.$page.path);
    }
  },
  mounted() {
    console.log(this.getPath);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>