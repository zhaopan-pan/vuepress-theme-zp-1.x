<template>
  <div>
    <div v-if="justShowTags">
      <TagsItem
        :tagsList="tagsList"
        :justShowTags="justShowTags"
        :getArticleListByTag="getArticleListByTag"
        :currentTag="currentSelectTag"
      />
    </div>
    <CommonLayout v-else>
      <div class="util-container">
        <div class="tags">
          <TagsItem
            :tagsList="tagsList"
            :getArticleListByTag="getArticleListByTag"
            :currentTag="currentSelectTag"
          />
        </div>
        <!-- created中组装的数据在嵌套组件不能for循环渲染 单条可以 ？？？-->
        <ArticleCard
          class="blog-list"
          :dataList="posts"
          :currentPage="currentPage"
          :currentTag="currentTag"
        />
      </div>
    </CommonLayout>
  </div>
</template>

<script>
import CommonLayout from "@theme/components/CommonLayout";
import ArticleCard from "@theme/components/ArticleCard";
import TagsItem from "@theme/components/TagsItem";
import mixin from "@theme/mixins/index.js";

export default {
  name: "Tags",
  mixins: [mixin],
  components: {
    CommonLayout,
    ArticleCard,
    TagsItem,
  },
  props: {
    justShowTags: { type: Boolean, default: () => false },
    currentTag: { type: String, default: () => "" },
  },
  data() {
    return {
      tagsList: [],
      show: false,
      currentSelectTag: "", //当前选中tag
      posts: [], //文章list
      currentPage: Number(1), //页码
      pageSize: 3, //每页条数
    };
  },
  created() {
    const tags = this.$tags;
    const currentTag = this.$route.query.tag
      ? this.$route.query.tag
      : this.$tags.list[0].name;
    if (tags && tags.list) {
      const tagArr = tags.list;
      tagArr.map((item) => {
        item.color = this.tagColor();
        return item;
      });
      this.tagsList = tagArr || [];
      this.getArticleListByTag(currentTag);
    }
  },
  computed: {},

  mounted() {},

  methods: {
    clickTag: function (tagName) {
      this.currentSelectTag = tagName;
      this.getArticleListByTag(tagName);
    },
    tagColor: function () {
      const colorArr = ["#E6A23C", "#F56C6C", "#909399", "#67C23A", "#409EFF"];
      const tagColorIndex = Math.floor(Math.random() * colorArr.length);
      return colorArr[tagColorIndex];
    },
    // 筛选数据
    getArticleListByTag: function (currentTag) {
      this.currentSelectTag = currentTag;
      let posts = this.$tags.map[currentTag].pages;
      setTimeout(() => {
        this.posts = this.$dateSortByTime(posts);
      }, 100);
      this.getCurrentPage(1);
    },

    getCurrentTag(tag) {
      this.$emit("currentTag", tag);
    },

    getCurrentPage(page) {
      this.currentPage = Number(page);
      this.$page.currentPage = page;
    },
  },
};
</script>
<style lang="stylus" scoped>
.tags {
  margin: 3rem auto;
}
</style>
