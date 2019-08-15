<template>
  <CommonLayout>
    <div :class="pageShow?'zp-show': 'zp-hide'">
      <Home v-if="$page.frontmatter.home" />
      <Page v-else :sidebar-items="sidebarItems">
        <slot name="page-top" slot="top" />
        <slot name="page-bottom" slot="bottom" />
      </Page>
    </div>
  </CommonLayout>
</template>

<script>
import CommonLayout from "./CommonLayout";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";
import { resolveSidebarItems } from "../util";

export default {
  components: { Home, Page, CommonLayout },
  data() {
    return {
      pageShow: false
    };
  },
  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    }
  },

  mounted() {
    console.log(location);
    this.pageShow = true;
  },

  methods: {}
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme/index.styl" lang="stylus"></style>
<style src="../styles/loadMixin.styl" lang="stylus"></style>
<style lang="stylus">
.zp-show {
  load-end(0.08s);
}

.zp-hide {
  load-start();
}
</style>