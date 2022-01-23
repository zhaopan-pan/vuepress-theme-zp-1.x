<template>
  <div>
    <!-- 颜色选择 -->
    <i class="iconfont zpicon-chooseTheme" @click.prevent="chooseTheme">
      <div class="color-wheel">
        <div class="triangle"></div>
        <div class="colors" @click.stop="singleColor('#000')"></div>
        <div class="colors"></div>
        <div class="colors"></div>
        <div class="colors"></div>
        <div class="colors"></div>
      </div>
    </i>
  </div>
</template>

<script>
export default {
  name: "Theme",
  data() {
    return {};
  },
  methods: {
    chooseTheme: function() {
    },
    singleColor: function(color) {
      // this.$emit("themeColor",color)
      document.body.classList.add("zp-theme-night");
    }
  }
};
</script>

<style lang="stylus" scoped>
.zpicon-chooseTheme {
  width: 2rem;
  height: 1.8rem;
  font-size: 1.8rem;
  position: relative;

  .color-wheel {
    position: absolute;
    width: 8rem;
    height: 1.5rem;
    right: -3.5rem;
    top: 2.5rem;
    border: 1px solid #ccc;
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

    .triangle:before,
    .triangle:after {
      position: absolute;
      content: "";
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
      width: 13%;
      height: 70%;
      margin-left: 5.9%;
      background: green;
      cursor: pointer;
    }
  }
}
</style>