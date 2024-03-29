<template>
  <main class="page" :style="pageStyle">
    <slot name="top" />
    <div class="theme-default-content">
      <h1 class="article-title" v-if="isAticle">
        {{ page.title || page.frontmatter.title || "-" }}
      </h1>
      <ArticleInfo
        :articleInfo="page"
        :currentTag="page.tag"
        v-if="isAticle"
        class="custom"
      ></ArticleInfo>
      <hr v-if="isAticle" />
      <Content />
    </div>
    <TimeLine v-if="isTimeLine"></TimeLine>
    <footer class="page-edit" v-if="!isTimeLine">
      <div class="edit-link" v-if="editLink">
        <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
          editLinkText
        }}</a>
        <OutboundLink />
      </div>

      <div class="last-updated" v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}:</span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ←
          <router-link v-if="prev" class="prev" :to="prev.path">{{
            prev.title || prev.path
          }}</router-link>
        </span>

        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">{{
            next.title || next.path
          }}</router-link
          >→
        </span>
      </p>
    </div>

    <slot name="bottom" />
    <Comments v-if="isShowComment" />
    <SubSidebar class="side-bar" />
  </main>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from "../util";
import TimeLine from "@theme/components/TimeLine";
import ArticleInfo from "./ArticleInfo";
import Comments from "@theme/components/Comments";
import SubSidebar from "@theme/components/SubSidebar";

export default {
  props: ["sidebarItems"],
  components: { TimeLine, ArticleInfo, Comments, SubSidebar },
  computed: {
    isShowComment() {
      return (
        (!this.$page.frontmatter.home &&
          !this.$page.frontmatter.isTag &&
          !this.$page.frontmatter.isTimeLine &&
          !this.$page.path.includes("categories") &&
          (this.$page.frontmatter.comments !== undefined
            ? this.$page.frontmatter.comments
            : true)) ||
        false
      );
    },
    lastUpdated() {
      return this.$page.lastUpdated;
    },
    isTimeLine() {
      return this.$page.frontmatter.isTimeLine;
    },
    isCategory() {
      return this.$page.path.includes("categories");
    },
    isAticle() {
      return (
        !this.$page.frontmatter.isTimeLine &&
        !this.$page.frontmatter.noTitle == true
      );
    },
    page() {
      return this.$page;
    },
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },

    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo,
      } = this.$site.themeConfig;

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    },
    pageStyle() {
      return this.$showSubSideBar ? {} : { paddingRight: "0" };
    },
  },
  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    },
  },
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.page
  padding-top 3rem
  padding-bottom 2rem
  padding-right 14rem
  display block
  .side-bar
    position fixed
    top 10rem
    bottom 10rem
    right 2rem
    overflow-y scroll
    &::-webkit-scrollbar
      width 0
      height 0
.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa
.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    float right
@media (max-width $MQMobile)
  .page
    padding-right 0
    .side-bar
      display none
    .page-edit
      .edit-link
        margin-bottom 0.5rem
      .last-updated
        font-size 0.8em
        float none
        text-align left
</style>
