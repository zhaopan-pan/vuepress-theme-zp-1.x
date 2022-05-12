<template>
  <div class="vcomment" v-if="data.comments !== false">
    <div id="valine"></div>
  </div>
</template>

<script>
export default {
  name: "Valine",
  props: {
    hasSidebar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  },
  mounted() {
    this.createValine();
  },

  methods: {
    createValine() {
      const valineConfig = this.$themeConfig.valineConfig;
      if (!valineConfig) return;
      const Valine = require("valine");
      const valineOptions = {
        el: "#valine",
        placeholder: "just go go",
        notify: false,
        verify: false,
        avatar: "retro",
        visitor: true,
        recordIP: false,
        path: window.location.pathname,
        ...valineConfig,
      };

      new Valine(valineOptions);
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        setTimeout(() => {
          //重新刷新valine
          this.createValine();
        }, 300);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@media (max-width $MQMobile)
  .hasSidebarAndPc
    margin-left 0rem !important
.hasSidebarAndPc
  margin-left 20rem
#valine
  max-width 740px
  padding 10px
  display block
  margin-left auto
  margin-right auto
</style>
