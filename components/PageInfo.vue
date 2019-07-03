<template>
  <div>
    <i
      class="iconfont zpicon-person"
      v-if="pageInfo.frontmatter.author || $themeConfig.author || $site.title"
    >
      <span>{{ pageInfo.frontmatter.author || $themeConfig.author || $site.title }}</span>
    </i>
    <i class="iconfont zpicon-date" v-if="pageInfo.frontmatter.date">
      <span>{{ new Date(pageInfo.frontmatter.date).toLocaleDateString() }}</span>
    </i>
    <!-- <AccessNumber :idVal="pageInfo.path" :numStyle="numStyle"></AccessNumber> -->
    <i class="iconfont zpicon-tag tags" v-if="pageInfo.frontmatter.tag">
      <span
        v-for="(subItem, subIndex) in pageInfo.frontmatter.tag"
        :key="subIndex"
        class="tag-item"
        :class="{ 'active': currentTag == subItem }"
        @click="goTags(pageInfo.frontmatter.tag)"
      >{{subItem}}</span>
    </i>
  </div>
</template>

<script>
// import AccessNumber from "./Valine/AccessNumber";

export default {
  // components: { AccessNumber },
  props: ["pageInfo", "currentTag"],
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
    // console.log(this.pageInfo);
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
.iconfont {
  display: inline-block;
  line-height: 1.5rem;

  &:not(:last-child) {
    margin-right: 1rem;
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

@media (max-width: $MQMobile) {
  .tags {
    display: block;
    margin-left: 0 !important;
  }
}
</style>
