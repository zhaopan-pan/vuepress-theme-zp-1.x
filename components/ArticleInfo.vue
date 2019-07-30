<template>
  <div class="article-Info">
    <i
      class="iconfont zpicon-person"
      v-if="articleInfo.frontmatter.author || $themeConfig.author || $site.title"
    >
      <span>{{ articleInfo.frontmatter.author || $themeConfig.author || $site.title }}</span>
    </i>
    <i class="iconfont zpicon-date" v-if="articleInfo.frontmatter.date">
      <span>{{ new Date(articleInfo.frontmatter.date).toLocaleDateString() }}</span>
    </i>
    <!-- <i class="iconfont zpicon-date" v-if="articleInfo.frontmatter.date"></i> -->
    <!-- <span>{{ new Date(articleInfo.frontmatter.date).toLocaleDateString() }}</span> -->
    <i class="iconfont zpicon-book1 tags" v-if="articleInfo.frontmatter.tag">
      <span
        v-for="(subItem, subIndex) in articleInfo.frontmatter.tag"
        :key="subIndex"
        class="tag-item"
        :class="{ 'active': currentTag == subItem }"
        @click="goTags(articleInfo.frontmatter.tag)"
      >{{subItem}}</span>
    </i>
  </div>
</template>
<!-- <AccessNumber :idVal="articleInfo.path" :numStyle="numStyle"></AccessNumber> -->

<script>
// import AccessNumber from "./Valine/AccessNumber";

export default {
  // components: { AccessNumber },
  name: "ArticleInfo",
  props: ["articleInfo", "currentTag"],
  data() {
    return {
      numStyle: {
        fontSize: ".9rem",
        fontWeight: "normal",
        color: "#999"
      }
    };
  },

  mounted() {
    console.log(this.articleInfo.frontmatter.date);
  },
  methods: {
    goTags(tag) {
      console.log(tag);
      window.location.href = `/zpblog/tag/?tag=${tag}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.article-Info {
  display: flex;
  justify-content: start;

  .iconfont {
    display: inline-block;
    line-height: 1.5rem;

    &:not(:last-child) {
      margin-right: 0.8rem;
    }

    span {
      // margin-left: 0.5rem;
    }
  }

  .tags {
    .tag-item {
      cursor: pointer;

      &.active {
        color: $accentColor;
      }

      &:hover {
        color: $accentColor;
        transform: scale(1.15);
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .tags {
    display: block;
    margin-left: 0 !important;
  }

  .article-Info {
    flex-wrap: wrap;
  }
}
</style>
