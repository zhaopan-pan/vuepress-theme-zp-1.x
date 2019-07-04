<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <router-link :to="$localePath" class="home-link">
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </router-link>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <!-- 颜色选择 -->
      <i class="iconfont zpicon-chooseTheme" @click.prevent="chooseTheme">
        <div class="color-wheel">
          <div class="triangle"></div>
          <div class="colors" @click.stop="singleColor('#000')"></div>
          <div class="colors"></div>
          <div class="colors"></div>
          <div class="colors"></div>
          <div class="colors"></div>
          <div class="colors"></div>
          <div class="colors" style="marginRight:5%"></div>
        </div>
      </i>

      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchBox
        v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
      />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data() {
    return {
      linksWrapMaxWidth: null
    };
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  },
  methods: {
    chooseTheme: function() {
      console.log(this.$refs);
    },
    singleColor:function(color){
      this.$emit("themeColor",color)
    }
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: $textColor;
    position: relative;
  }

  .links {
    padding-left: 0rem !important;
    box-sizing: border-box;
    background-color: white;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }

    .zpicon-chooseTheme {
      width: 2rem;
      height: 1.8rem;
      font-size: 1.8rem;
      position: relative;

      .color-wheel {
        position: absolute;
        width: 12rem;
        height: 1.5rem;
        right: -6rem;
        top: 2.5rem;
        border: 1px solid #CCC;
        border-radius: 0.2rem;
        background: #fff;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

        .triangle {
          position: absolute;
          left: 38%;
          top: -20px;
        }

        .triangle:before, .triangle:after {
          position: absolute;
          content: '';
          border-top: 10px transparent dashed;
          border-left: 10px transparent dashed;
          border-right: 10px transparent dashed;
          border-bottom: 10px #fff solid;
        }

        .triangle:before {
          border-bottom: 10px #ccc solid;
        }

        .triangle:after {
          top: 1px;
          border-bottom: 10px #fff solid;
        }

        .colors {
          width: 10%;
          height: 80%;
          margin-left: 5%;
          background: green;
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }
  }
}
</style>
