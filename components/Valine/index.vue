<template>
  <div class="vcomment" v-if="data.comments === true">
    <div id="vcomments"></div>
  </div>
</template>

<script>
import { isActive, hashRE, groupHeaders } from "../../util";
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    }
  },
  mounted: function() {
    this.createValine();
  },

  methods: {
    createValine() {
      const Valine = require("valine");
      window.AV = require("leancloud-storage");
      const valine = new Valine({
        el: "#vcomments",
        appId: "GW2fsulTOfGFPWhOAkNBu9Wm-gzGzoHsz",
        appKey: "bpvMmVf4m5D9KoSWsKVDYnUP",
        notify: false,
        verify: false,
        avatar: "monsterid",
        path: window.location.pathname,
        placeholder: "just go go"
      });
      this.valineRefresh = false;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        setTimeout(() => {
          //重新刷新valine
          this.createValine();
        }, 300);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#vcomments {
  max-width: 740px;
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>