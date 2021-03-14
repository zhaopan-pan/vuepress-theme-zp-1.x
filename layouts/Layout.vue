<template>
  <CommonLayout>
    <div :class="pageShow ? 'zp-show' : 'zp-hide'" class="noscroll">
      <component v-if="$page.frontmatter.home" :is="isHome"></component>
      <!-- <Home v-if="$page.frontmatter.home" /> -->
      <Page v-else :sidebar-items="sidebarItems">
        <slot name="page-top" slot="top" />
        <slot name="page-bottom" slot="bottom" />
      </Page>
    </div>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@theme/components/CommonLayout";
import Home from "@theme/components/Home.vue";
import HomeBlog from "@theme/components/HomeBlog.vue";
import Page from "@theme/components/Page.vue";
import { resolveSidebarItems } from "../util";

export default {
  components: { Home, HomeBlog, Page, CommonLayout },
  data() {
    return {
      pageShow: false,
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
    },
    isHome() {
      const { type } = this.$themeConfig;
      if (type !== undefined) {
        return type == "blog" ? "HomeBlog" : type;
      }
      return "Home";
    },
  },

  mounted() {
    console.log(location);
    this.pageShow = true;
  },

  methods: {},
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

.shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>