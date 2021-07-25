<template>
  <!-- id 将作为查询条件 -->
  <span
    :id="getPath(path)"
    class="leancloud_visitors ml5"
    data-flag-title="Your Article Title"
  >
    <span class="leancloud-visitors-count"></span>
  </span>
</template>

<script>
import ZpIcon from '@theme/components/ZpIcon'
export default {
  name: 'AccessCount',
  components: { ZpIcon },
  props: {
    path: {
      type: String,
      default: () => '/',
    },
  },
  mounted() {},
  methods: {
    getPath(path) {
      const base = this.$site.base
      return base.slice(0, base.length - 1) + path
    },
  },
}
</script>

<style lang="stylus" scoped></style>
