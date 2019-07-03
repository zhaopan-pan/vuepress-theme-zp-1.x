<template>
  <div class="abstract-wrapper">
    <div
      v-for="(item, index) in data"
      :key="item.path"
      v-show="index >= (currentPage * pageSize - pageSize) && index < currentPage * pageSize"
      class="abstract-item"
    >
      <div class="title">
        <router-link :to="item.path">{{item.title}}</router-link>
      </div>
      <i class="zpicon-up iconfont" />
      <i class="zpicon-Stone-airplane iconfont" />
      <i class="zpicon-date iconfont" />
      <div class="abstract-info" v-html="item.excerpt"></div>
      <hr />
      <PageInfo :pageInfo="item" :currentTag="currentTag"></PageInfo>
    </div>
  </div>
</template>

<script>
import PageInfo from "./PageInfo";

export default {
  components: { PageInfo },
  props: {
    data: {
      type: Array,
      default: []
    },
    currentTag: {
      type: String,
      default: ""
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style lang="stylus" scoped>
.abstract-wrapper {
  width: 100%;

  .abstract-item {
    margin: 0 auto 20px;
    padding: 16px 20px;
    width: 100%;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    transition: all 0.3s;
    background-color: $bgColor;

    &:hover {
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
    }

    .title {
      position: relative;
      font-size: 1.28rem;
      line-height: 36px;
      display: inline-block;

      :after {
        content: '';
        position: absolute;
        width: 0%;
        height: 2px;
        bottom: 0;
        right: 0;
        background-color: $accentColor;
        visibility: hidden;
        // -webkit-transform: scaleX(0);
        // transform: scaleX(0);
        transition: 0.3s ease-in-out;
      }

      :hover:after {
        visibility: visible;
        // -webkit-transform: scaleX(1);
        // transform: scaleX(1);
        width: 100%;
      }
    }

    .abstract-info {
      padding: 0 20px;
    }

    .tags {
      .tag-item {
        cursor: pointer;

        &.active {
          color: $accentColor;
        }

        &:hover {
          color: $accentColor;
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .tags {
    display: block;
    margin-top: 1rem;
    margin-left: 0 !important;
  }
}
</style>
