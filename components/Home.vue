<template>
  <main class="home" aria-labelledby="main-title" :class="pageShow?'zp-show': 'zp-hide'">
    <!-- 官方home -->
    <!-- <header class="hero"> -->
    <!-- <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'" /> -->
    <!-- <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>
    <p class="description">{{ data.tagline || $description || 'Welcome to your VuePress site' }}</p>-->
    <!-- <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </header>
    <div class="features" v-if="data.features && data.features.length">
      <div class="feature" v-for="(feature, index) in data.features" :key="index">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>-->

    <div class="home-blog">
      <!-- 博客列表 -->
      <ArticleCard class="blog-list" :data="posts" :currentPage="1"></ArticleCard>
      <div class="blogger-info">
        <img class="personal-img" :src="$withBase($themeConfig.logo)" alt="hero" />
        <h3
          class="name"
          v-if="$themeConfig.author || $site.title"
        >{{ $themeConfig.author || $site.title }}</h3>
        <div class="num">
          <div>
            <i class="zpicon-up iconfont" />
            <i class="zpicon-Stone-airplane iconfont" />
            <i class="zpicon-date iconfont" />
          </div>
          <div>{{$tags.length}}</div>
        </div>
      </div>
    </div>

    <Content class="custom" />

    <div class="footer" v-if="data.footer">{{ data.footer }}</div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import ArticleCard from "@theme/components/ArticleCard.vue";
import { posix } from "path";

export default {
  components: { NavLink, ArticleCard },
  data() {
    return {
      pageShow: false
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
    }
  }
};
</script>

<style lang="stylus">
@require '../styles/loadMixin.styl';

.home {
  padding: $navbarHeight 2rem 0;
  margin: 0px auto;
  display: block;
  max-width: 960px;

  .home-blog {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    max-width: 1126px;

    .blogger-info {
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

  .features {
    max-width: 1126px;
    padding: 1.2rem 0;
    margin: 2.5rem auto 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 32%;
    transition: all 0.5s;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    h2 {
      font-size: 1.6rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 20%);
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
    load-start();

    > span {
      margin-left: 1rem;

      > i {
        margin-right: 0.5rem;
      }
    }
  }

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }

    .blogger-info {
      display: none;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}

.zp-show {
  load-end(0.08s);
}

.zp-hide {
  load-start();
}
</style>
