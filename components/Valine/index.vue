<template>
  <div class="vcomment" v-if="data.comments === true">
    <div id="vcomments"></div>
  </div>
</template>

<script>
import { isActive, hashRE, groupHeaders } from "../../util";
import Valine from 'valine';
export default {
  name:"Valine",
  computed: {
    data() {
      return this.$page.frontmatter;
    }
  },
  mounted() {
    console.log("来了！！！！");
    this.createValine();
  },

  methods: {
    createValine() {
      //  = require("leancloud-storage")
      if (typeof window !== "undefined") {
        this.window = window;
        window.AV = require('leancloud-storage');
      }
      // const Valine = require('valine');
      console.log(Valine);
      const valine = new Valine({
        el: "#vcomments",
        appId: "GW2fsulTOfGFPWhOAkNBu9Wm-gzGzoHsz",
        appKey: "bpvMmVf4m5D9KoSWsKVDYnUP",
        notify: false,
        verify: false,
        avatar: "monsterid",
        path: window.location.pathname,
        placeholder: "just go go",
        visitor: true // 阅读量统计
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