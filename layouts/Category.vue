<template>
  <CommonLayout :sidebarShow="true">
    <div class="util-container">
      <div class="categories">
        <router-link
          class="categories-item"
          :class="{ active: getCurrentCategoryName == item.name }"
          :to="item.path"
          v-for="(item, index) in getRouteData"
          :key="index"
          >{{ item.name }}</router-link
        >
      </div>
      <ArticleCard
        class="blog-list"
        :dataList="postsData"
        @currentTag="getCurrentTag"
      ></ArticleCard>
      <!-- <pagation
        :total="postsData.length"
        :currentPage="currentPage"
        @getCurrentPage="getCurrentPage"
      ></pagation>-->
    </div>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@theme/components/CommonLayout";
import ArticleCard from "@theme/components/ArticleCard.vue";
// import Pagation from "../components/Pagation.vue";
import mixin from "@theme/mixins/index.js";

export default {
  name: "Category",
  mixins: [mixin],
  components: {
    CommonLayout,
    ArticleCard,
    //  Pagation
  },
  props: {},
  data() {
    return {
      currentPage: Number(1), //页码
      pageSize: 3, //每页条数
      categoryName: "",
    };
  },
  computed: {
    getPath() {
      return this.$page.path;
    },
    getCategories() {
      return this.$categories;
    },

    getCurrentCategoryName() {
      const getCategoriesMap = this.getCategories.map;
      for (let item in getCategoriesMap) {
        if (this.getPath.includes(item)) {
          if (this.categoryName && this.categoryName !== item) {
            this.currentPage = Number(1);
          }
          this.categoryName = item;

          return item;
        }
      }
    },
    postsData() {
      const getCategoriesMap = this.getCategories.map;
      console.log(getCategoriesMap[this.getCurrentCategoryName].pages);
      return this._dateSortByTime(
        getCategoriesMap[this.getCurrentCategoryName].pages
      );
    },
    getRouteData() {
      const routeData = [];
      this.getCategories.list.map((item) => {
        routeData.push({ path: item.path, name: item.name });
      });
      return routeData;
    },
  },
  mounted() {},
  methods: {
    getCurrentTag(tag) {
      this.$emit("currentTag", tag);
    },
    getCurrentPage(page) {
      console.log(this.$page);
      console.log(page);
      this.currentPage = Number(page);
      this.$page.currentPage = page;
    },
  },
};
</script>

<style lang="stylus" scoped>
.categories {
  margin: 3rem auto;
  flex: 1;

  .categories-item {
    display: inline-block;
    width: auto;
    line-height: 1.8rem;
    margin: 0.4rem 0.3rem;
    padding: 0.2rem 0.5rem;
    border: 1px solid #cfd4db;
    border-radius: 0.3rem;
    transition: all 0.3s;
    color: $textColor;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      background: #d0cbcb;
      color: #fff !important;
      border: 1px solid #d0cbcb;
    }

    &.active {
      background: #d0cbcb !important;
      color: #fff !important;
      border: 1px solid #d0cbcb !important;
    }
  }
}
</style>