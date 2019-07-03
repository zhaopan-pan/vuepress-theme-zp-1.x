<template>
  <div class="back-top" ref="toTop" @click="onScroll" v-on:scroll.passive="onScroll">
    <i class="zpicon-fly-body iconfont" />
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  components: {},
  data() {
    return {
      offsetTopData: "",
      toTopDom: "",
      mostTop: ""
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
      console.log(this.$refs["toTop"].scrollTop);
      this.offsetTopData = this.$refs["toTop"].offsetTop;
      this.mostTop = this.$refs["mostTop"];
      // this.$refs["toTop"].addEventListener("scroll", this.toTopDom);
    });
  },
  methods: {
    onScroll: function(e) {
      console.log(document.body.offsetTop);
      window.scrollTo(0, 0);
      // document.body.scrollHeight - this.$refs["toTop"].offsetTop;
    }
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

  &:hover {
    transform: scaleY(1.5);
  }

  .zpicon-fly-body {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
