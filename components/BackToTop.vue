<template>
  <div class="back-top" ref="toTop" @click="scrollToTop">
    <svg
      t="1627394618689"
      class="to-top-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6226"
      width="40"
      height="40"
    >
      <path
        d="M711 404.4C713.9 176.5 526.4 72.7 512 64c-11.5 5.8-201.9 109.6-199 340.4-37.5 26-77.9 69.2-72.1 144.2 5.8 75 80.8 126.9 109.6 124 28.8-2.9 20.2-23.1 20.2-23.1l8.7-40.4s43.3 63.5 54.8 63.5H590c14.4 0 54.8-63.5 54.8-63.5l8.7 40.4s-8.7 20.2 20.2 23.1c28.8 2.9 103.8-49 109.6-124 5.6-75-34.8-118.3-72.3-144.2zM594 282c0 45.3-36.7 82-82 82s-82-36.7-82-82 36.7-82 82-82 82 36.7 82 82zM444 874.8c0 12.6-12.6 25.2-25.2 25.2s-25.2-12.6-25.2-25.2V753.2c0-12.6 12.6-25.2 25.2-25.2s25.2 12.6 25.2 25.2v121.6z m0 0M537.2 933.5c0 12.6-12.6 25.2-25.2 25.2s-25.2-12.6-25.2-25.2V753.2c0-12.6 12.6-25.2 25.2-25.2s25.2 12.6 25.2 25.2v180.3z m0 0M632.9 841.2c0 12.6-12.6 25.2-25.2 25.2s-25.2-12.6-25.2-25.2v-88c0-12.6 12.6-25.2 25.2-25.2s25.2 12.6 25.2 25.2v88z m0 0"
        p-id="6227"
        fill="#2c3e50"
      ></path>
    </svg>
  </div>
</template>

<script>
import ZpIcon from '@theme/components/ZpIcon'
import animationSrcoll from '@theme/util/animationSrcoll'

export default {
  name: 'BackToTop',
  components: { ZpIcon },
  data() {
    return {
      fromTopNum: 0,
      toTopDom: '',
      mostTop: '',
      interVal: null,
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    // 通过$refs获取dom元素
    this.toTopDom = this.$refs['toTop']
    // 监听这个dom的scroll事件
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollToTop: function(e) {
      this.backToTopFun()
    },
    handleScroll() {
      this.fromTopNum = Math.ceil(window.pageYOffset)
      // 超过页面的body高度的三分之一
      if (
        Math.ceil(
          (document.body.clientHeight - 57) /
            (document.body.clientHeight > 10000 ? 7 : 3)
        ) < this.fromTopNum
      ) {
        this.toTopDom.style.opacity = 1
        this.toTopDom.style.zIndex = 1
        this.toTopDom.style.bottom = '5%'
      } else {
        this.toTopDom.style.opacity = 0
        this.toTopDom.style.zIndex = -1
        this.toTopDom.style.bottom = '-5%'
      }
    },
    backToTopFun: function() {
      animationSrcoll(10, this.fromTopNum, 600)
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="stylus" scoped>
.back-top
  position: fixed;
  right: 10%;
  bottom: -5%;
  transform: scaleY(1);
  transition: all 0.5s;
  opacity: 0;
  z-index: -1;
  box-shadow: $boxShadow;
  border-radius: 5px;
  background: #fff;

  &:hover
    z-index: -1;

  .to-top-icon{
    padding: 3px 5px 0px 5px;
  }
</style>
