<template>
  <main
    class="util-container home"
    aria-labelledby="main-title"
    :class="pageShow?'zp-show': 'zp-hide'"
  >
    <div class="home-blog">
      <!-- 博客列表 -->
      <ArticleCard class="blog-list" :dataList="posts" :currentPage="currentPage">
        <!-- <pagation :total="posts.length" :currentPage="currentPage" @getCurrentPage="getCurrentPage"></pagation> -->
      </ArticleCard>
      <div class="blog-review">
        <img class="personal-img" :src="$withBase($themeConfig.logo)" alt="hero" />
        <h3
          class="name"
          v-if="$themeConfig.author || $site.title"
        >{{ $themeConfig.author || $site.title }}</h3>
        <div class="num">
          <div>
            <!-- <i class="zpicon-up iconfont" />
            <i class="zpicon-Stone-airplane iconfont" />
            <i class="zpicon-date iconfont" />-->
            {{posts.length}}
          </div>
          <div>{{$tags.length}}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ArticleCard from "@theme/components/ArticleCard.vue";
// import Pagation from "../components/Pagation.vue";
export default {
  name: "HomeBlog",
  components: {
    ArticleCard,
    // Pagation
  },
  data() {
    return {
      pageShow: false,
      currentPage: 1
    };
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
    posts() {
      console.log(this.$page);
      let posts = this.$site.pages;
      posts = posts.filter(item => {
        const { home, isTimeLine, date, tag } = item.frontmatter;
        return !(home == true || date === undefined || tag === undefined);
      });
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a);
      });
      // console.log(posts);
      return posts;
    },
    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  },
  mounted() {
    this.pageShow = true;
    // console.log(this);
    console.log(this.posts);
    // let posts = this.$site.pages;
    // posts = posts.filter(item => {
    //   const { home, date } = item.frontmatter;
    //   return !(home == true);
    // });
    // posts.sort((a, b) => {
    //   return this._getTimeNum(b) - this._getTimeNum(a);
    // });
    // console.log(posts);
  },

  methods: {
    // 获取时间的数字类型
    _getTimeNum(date) {
      return parseInt(new Date(date.frontmatter.date).getTime());
    },
    getCurrentPage(page) {
      this.currentPage = Number(page);
      this.$page.currentPage = page;
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }
};
</script>
<style lang="stylus">
@require '../styles/loadMixin.styl';

.home-blog {
  display: flex;
  align-items: flex-start;
  margin: 20px auto 0;
  max-width: 1126px;

  .blog-review {
    transition: all 0.3s;
    margin-left: 15px;
    width: 380px;
    height: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
    }

    .personal-img {
      display: block;
      margin: 2rem auto;
      width: 8rem;
      height: 8rem;
      border-radius: 8rem;
    }

    .name {
      text-align: center;
    }

    .num {
      display: flex;
      margin: 0 auto 1rem;
      width: 80%;

      > div {
        text-align: center;
        flex: auto;

        &:first-child {
          border-right: 1px solid #333;
        }

        i {
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>