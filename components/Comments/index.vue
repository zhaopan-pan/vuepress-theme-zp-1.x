<template>
  <!-- id 将作为查询条件 -->
  <div v-show="commentsShow">
    <ClientOnly>
      <Valine />
    </ClientOnly>
  </div>
</template>

<script>
import Valine from "./Valine.vue";
export default {
  name: "Comments",
  components: { Valine },
  props: {
    commentsShow: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus" scoped></style>
