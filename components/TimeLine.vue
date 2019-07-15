<template>
  <div class="timeline-page">
    <ul class="zp-timeline">
      <li class="zp-timeline-item">
        <div class="zp-timeline-item__node"></div>
        <div class="zp-timeline-item__line"></div>
        <div class="zp-timeline-item__wrapper">
          <div class="zp-timeline-item__content">支持使用图标</div>
          <div class="zp-timeline-item__timestamp">04-12 20:46</div>
        </div>
      </li>
      <li class="zp-timeline-item">
        <div class="zp-timeline-item__yearnode"></div>
        <div class="zp-timeline-item__line"></div>
        <div class="zp-timeline-item__wrapper">
          <div class="zp-timeline-item__year">2018</div>
        </div>
      </li>
      <li class="zp-timeline-item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log(this.$site);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.timeline-page {
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem 2.5rem;

  .zp-timeline {
    margin: 0;
    font-size: 14px;
    list-style: none;
  }

  .zp-timeline-item {
    position: relative;
    padding-bottom: 20px;
    cursor: pointer;

    &:hover {
      color: $accentColor;
      .zp-timeline-item__node:before {
        background-color: $accentColor;
      }
    }

    .zp-timeline-item__node:before {
      content: ' ';
      left: -1px;
      width: 12px;
      height: 12px;
      position: absolute;
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .zp-timeline-item__yearnode {
      left: -2px;
      width: 15px;
      height: 15px;
      position: absolute;
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .zp-timeline-item__line {
      position: absolute;
      left: 4px;
      height: 100%;
      border-left: 2px solid #e4e7ed;
    }

    .zp-timeline-item__wrapper {
      position: relative;
      padding-left: 28px;
      top: -3px;

      .zp-timeline-item__year {
        font-size: 25px;
        line-height: 25px;
      }

      .zp-timeline-item__content {
        cursor: pointer;

        &:hover {
          color: $accentColor;
        }
      }
    }
  }
}
</style>