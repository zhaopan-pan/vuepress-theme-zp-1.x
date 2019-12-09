<template>
  <CommonLayout>
    <div class="util-container">
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
      <!-- created中组装的数据在嵌套组件不能for循环渲染 单条可以 ？？？-->
      <ArticleCard
        class="blog-list"
        :dataList="posts"
        :currentPage="currentPage"
        :currentTag="currentSelectTag"
      />
      <!-- <pagation :total="posts.length" :currentPage="currentPage" @getCurrentPage="getCurrentPage"></pagation> -->
    </div>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@theme/components/CommonLayout";
import ArticleCard from "@theme/components/ArticleCard";
// import Pagation from "@theme/components/Pagation.vue";
import mixin from "@theme/mixins/index.js";

export default {
  mixins: [mixin],
  components: {
    CommonLayout,
    ArticleCard
    // Pagation
  },
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
    // const tags = this.$tags;
    // const currentTag = this.$route.query.tag
    //   ? this.$route.query.tag
    //   : this.$tags.list[0].name;

    // if (tags && tags.list) {
    //   console.log(tags.list);
    //   const tagArr = tags.list;
    //   tagArr.map(item => {
    //     item.color = this.tagColor();
    //     return item;
    //   });
    //   this.tagsList = tagArr || [];
    //   this.getArticleListByTag(currentTag);
    // }
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
      setTimeout(() => {
        this.posts = this._dateSortByTime(posts);
      }, 100);
      // this.posts = dateSortByTime(posts);
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
  margin: 3rem auto;

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
