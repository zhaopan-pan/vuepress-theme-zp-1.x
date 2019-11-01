<template>
  <CommonLayout>
    <div class="home">
      <div class="tags">
        <span
          class="single-tag"
          v-for="(item,index) in tagsList"
          :key="index"
          :class="{'active':currentSelectTag==item.name}"
          :style="{ 'backgroundColor': item.color }"
          @click="clickTag(item.name)"
        >{{item.name||""}}</span>
      </div>
      <!-- :currentTag="currentTag" -->
      <ArticleCard
        class="blog-list"
        :data="posts"
        :currentPage="currentPage"
        @currentTag="getCurrentTag"
        :pageSize="pageSize"
      ></ArticleCard>

      <pagation
        :data="posts"
        :currentPage="currentPage"
        @getCurrentPage="getCurrentPage"
        :pageSize="pageSize"
      ></pagation>
    </div>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@theme/components/CommonLayout";
import Home from "@theme/components/Home.vue";
import ArticleCard from "@theme/components/ArticleCard.vue";
import Pagation from "../components/Pagation.vue";

import { getTimeToSecond, dateSortByTime } from "../util";

export default {
  components: { Home, CommonLayout, ArticleCard, Pagation },

  data() {
    return {
      tagsList: [],
      show: false,
      currentSelectTag: "", //当前选中tag
      posts: [], //文章list
      currentPage: Number(1), //页码
      pageSize: 3 //每页条数
    };
  },
  created() {
    const tags = this.$tags;
    const currentTag = this.$route.query.tag
      ? this.$route.query.tag
      : this.$tags.list[0].name;

    if (tags && tags.list) {
      console.log(tags.list);
      const tagArr = tags.list;
      tagArr.map(item => {
        item.color = this.tagColor();
        return item;
      });
      this.tagsList = tagArr || [];
      this.getArticleListByTag(currentTag);
    }
  },
  computed: {},

  mounted() {
    console.log(this.$route.query);
  },

  methods: {
    clickTag: function(tagName) {
      this.currentSelectTag = tagName;
      this.getArticleListByTag(tagName);
      console.log(this.list);
    },
    tagColor: function() {
      const colorArr = ["#E6A23C", "#F56C6C", "#909399", "#67C23A", "#409EFF"];
      const tagColorIndex = Math.floor(Math.random() * colorArr.length);
      return colorArr[tagColorIndex];
    },
    // 筛选数据
    getArticleListByTag: function(currentTag) {
      console.log(currentTag);
      this.currentSelectTag = currentTag;
      let posts = this.$tags.map[currentTag].pages;
      this.posts = dateSortByTime(posts);
      // posts.length > 0
      //   ? posts.sort((a, b) => {
      //       return getTimeToSecond(b) - getTimeToSecond(a);
      //     })
      //   : [];
      this.getCurrentPage(1);
    },

    getCurrentTag(tag) {
      this.$emit("currentTag", tag);
    },

    getCurrentPage(page) {
      this.currentPage = Number(page);
      this.$page.currentPage = page;
    }
  }
};
</script>
<style lang="stylus" scoped>
.tags {
  margin: 30px auto;

  .single-tag {
    padding: 5px 10px;
    margin: 5px;
    border-radius: 4px;
    display: inline-flex;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.9s;

    &:hover {
      transform: scale(1.05);
    }

    &.active {
      transform: scale(1.2);
    }
  }
}
</style>
