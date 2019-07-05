<template>
  <CommonLayout>
    <Home v-if="$page.frontmatter.home"/>
    <Page v-else :sidebar-items="sidebarItems">
      <slot name="page-top" slot="top"/>
      <slot name="page-bottom" slot="bottom"/>
    </Page>
  </CommonLayout>
</template>

<script>
import CommonLayout from "./CommonLayout";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";
import { resolveSidebarItems } from "../util";

export default {
  components: { Home, Page, CommonLayout },
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
  },

  methods: {}
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme/index.styl" lang="stylus"></style>