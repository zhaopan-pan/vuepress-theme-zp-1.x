<template>
  <div class="back-top">
      <i class="zpicon-fly-body iconfont" />
  </div>
</template>

<script>

export default {
    name:"BackToTop",
  components: {  },
  props: {
    data: {
      type: Array,
      default:()=>[]
    },
  },
  mounted() {
  }
};
</script>

<style lang="stylus" scoped>
.back-top{
        position: fixed;
    right: 10%;
    bottom: 5%;
      transform: scaleY(1);
    transition: all 0.8s;
    &:hover {
      transform: scaleY(1.5);
    // font-size:40px
    }
.zpicon-fly-body{
    font-size:30px
    cursor: pointer;

    }
}
</style>
