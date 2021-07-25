<template>
  <div class="back-top" ref="toTop" @click="scrollToTop">
    <ZpIcon icon="airplane" />
  </div>
</template>

<script>
import ZpIcon from '@theme/components/ZpIcon'

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
    this.$nextTick(() => {
      this.toTopDom = this.$refs['toTop']
      // 通过$refs获取dom元素
      // this.mostTop = this.$refs.toTop;
      // 监听这个dom的scroll事件
      window.addEventListener('scroll', this.handleScroll)
    })
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
      let { fromTopNum } = this
      let currentTime = 0, // 初始值
        allTime = 500, // 最大阈值
        unit = 10 // 每帧增加单位数
      const animationSrcoll = () => {
        currentTime += unit
        const remainderNum = this.easeInOut(
          currentTime,
          fromTopNum, // 开始
          -fromTopNum, // 结束
          allTime
        )
        window.scrollTo(0, remainderNum)
        if (currentTime <= allTime && fromTopNum > 0) {
          requestAnimationFrame(animationSrcoll)
        }
      }
      requestAnimationFrame(animationSrcoll)
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b
      return (-c / 2) * (--t * (t - 2) - 1) + b
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    this.interVal ? clearInterval(this.interVal) : ''
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
  padding: 5px 2px 2px;
  border-radius: 5px;
  background: #fff;

  &:hover
    z-index: -1;

  .zpicon-airplane
    font-size: 30px;
    cursor: pointer;
</style>
