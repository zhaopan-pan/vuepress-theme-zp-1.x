<template>
  <div class="back-top" ref="toTop" @click="scrollToTop">
    <i class="zpicon-airplane iconfont" />
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  components: {},
  data() {
    return {
      fromTopNum: 0,
      toTopDom: "",
      mostTop: "",
      interVal: null
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(window.innerHeight);
      console.log(document.body.scrollHeight);
      this.toTopDom = this.$refs["toTop"];
      // 通过$refs获取dom元素
      // this.mostTop = this.$refs.toTop;
      // 监听这个dom的scroll事件
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  methods: {
    scrollToTop: function(e) {
      this.backToTopFun();
    },
    handleScroll() {
      // console.log(window.pageYOffset);
      this.fromTopNum = window.pageYOffset;
      const { fromTopNum } = this;
      if (fromTopNum > 150) {
        // console.log(this.toTopDom);
        this.toTopDom.style.opacity = 1;
        this.toTopDom.style.zIndex = 1;
      } else {
        this.toTopDom.style.opacity = 0;
        this.toTopDom.style.zIndex = -1;
      }
    },
    backToTopFun: function() {
      const { fromTopNum } = this;
      console.log(fromTopNum / 5);
      const cutFromTopNum = Math.floor(fromTopNum / 15);
      console.log(fromTopNum, cutFromTopNum);
      let num = 0;
      this.interVal = setInterval(() => {
        let remainderNum = fromTopNum - cutFromTopNum * num;
        if (remainderNum < 1 || cutFromTopNum * num - fromTopNum > 0) {
          clearInterval(this.interVal);
        }
        window.scrollTo(0, remainderNum);
        num++;
      }, 15);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    this.interVal ? clearInterval(this.interVal) : "";
  }
};
</script>

<style lang="stylus" scoped>
.back-top {
  position: fixed;
  right: 10%;
  bottom: 5%;
  transform: scaleY(1);
  transition: all 0.8s;
  opacity: 0;
  z-index: -1;

  &:hover {
    // transform: scaleY(1.5);
    z-index: -1;
  }

  .zpicon-airplane {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
