<template>
  <main
    class=""
    aria-labelledby="main-title"
    :class="pageShow ? 'zp-show' : 'zp-hide'"
  >
    <div>
      <HomeBg />
      <div class="home-blog util-container home">
        <!-- 博客列表 -->
        <ArticleCard
          class="blog-list"
          :dataList="posts"
          :currentPage="currentPage"
        >
          <!-- <pagation :total="posts.length" :currentPage="currentPage" @getCurrentPage="getCurrentPage"></pagation> -->
        </ArticleCard>
        <div class="blog-review">
          <div class="user-info shadow">
            <div class="img-box">
              <div class="img-border">
                <img
                  class="personal-img"
                  :src="$withBase($themeConfig.logo)"
                  alt="hero"
                />
              </div>
            </div>
            <h3 class="name" v-if="$themeConfig.author || $site.title">
              {{ $themeConfig.author || $site.title }}
            </h3>
            <div class="num">
              <div title="文章数">
                <!-- <i class="zpicon-up iconfont" />
            <i class="zpicon-Stone-airplane iconfont" />
            <i class="zpicon-date iconfont" />-->
                {{ posts.length }}
              </div>
              <div title="标签数">{{ $tags.length }}</div>
            </div>
          </div>
          <div class="tag-box shadow">
            <Tag :justShowTags="true" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </main>
</template>

<script>
import ArticleCard from '@theme/components/ArticleCard.vue'
import HomeBg from '@theme/components/HomeBg.vue'
import Footer from '@theme/components/Footer.vue'
import Tag from '@theme/layouts/Tags.vue'
export default {
  name: 'HomeBlog',
  components: {
    ArticleCard,
    HomeBg,
    Tag,
    Footer,
  },
  data() {
    return {
      pageShow: false,
      currentPage: 1,
    }
  },
  computed: {
    data() {
      return this.$page.frontmatter
    },
    posts() {
      let posts = this.$site.pages
      posts = posts.filter((item) => {
        const { home, isTimeLine, date, tag } = item.frontmatter
        return !(home == true || date === undefined || tag === undefined)
      })
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a)
      })
      return posts
    },
    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      }
    },
  },
  mounted() {
    this.pageShow = true
  },

  methods: {
    // 获取时间的数字类型
    _getTimeNum(date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    },
    getCurrentPage(page) {
      this.currentPage = Number(page)
      this.$page.currentPage = page
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    },
  },
}
</script>
<style lang="stylus" scope>
@require '../styles/loadMixin.styl';

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

.home-blog {
  display: flex;
  align-items: flex-start;
  // margin: 20px auto 0;
  max-width: 1126px;

  .blog-review {
    transition: all 0.3s;
    margin-left: 15px;
    width: 380px;
    height: auto;
    display: flex;
    flex-direction: column;

    .user-info {
      .img-box {
        display: flex;
        justify-content: center;
        margin: 4rem auto 3rem;

        .img-border {
          width: 3.5rem;
          height: 3.5rem;
          border: 1px solid rgba(0, 0, 0, 0);
          border-radius: 4rem;
          overflow: hidden;

          // -webkit-transform: rotate(360deg);
          // animation: rotation 3s linear infinite;
          // -moz-animation: rotation 3s linear infinite;
          // -webkit-animation: rotation 3s linear infinite;
          // -o-animation: rotation 3s linear infinite;
          .personal-img {
            display: block;
            width: 4rem;
            height: 4rem;
            position: relative;
            top: -10px;
          }
        }
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

    .tag-box {
      margin-top: 2rem;
      padding: 1rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .blog-review {
    display: none !important;
  }
}
</style>
