<template>
  <div class="timeline-page">
    <ul class="zp-timeline">
      <li
        class="zp-timeline-item"
        :key="index"
        v-for="(item,index) in timeLineData"
        @click="jumpToArticle(item.path)"
      >
        <div :class="!item.isyear?'zp-timeline-item__node':'zp-timeline-item__yearnode'"></div>
        <div class="zp-timeline-item__line" v-show="index<timeLineData.length-1"></div>
        <div class="zp-timeline-item__wrapper" v-if="!item.isyear">
          <div class="zp-timeline-item__content">{{item.title||"-"}}</div>
          <div class="zp-timeline-item__timestamp">{{item.frontmatter.date||"-"}}</div>
        </div>
        <div class="zp-timeline-item__wrapper" v-else>
          <div class="zp-timeline-item__year">{{item.year||"-"}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateSortByTime, deepCopy } from "../util";

export default {
  name: "TimeLine",
  props: {},
  data() {
    return {
      timeLineData: []
    };
  },
  mounted() {
    this.createTimeLineData();
  },
  methods: {
    jumpToArticle: function(path) {
      this.$router.push({ path: path });
    },
    createTimeLineData: function() {
      console.log(this.$site.pages);
      let allPageData = deepCopy(this.$site.pages);
      // let allPageData = JSON.stringify(this.$site.pages);
      if (allPageData.length == 0 || !allPageData) return;
      let needDealData = allPageData.filter(
        item => item.frontmatter.home != true && item.frontmatter.date
      );
      console.log(needDealData);
      this.timeLineData = this.addYearNode(dateSortByTime(needDealData));
      console.log(this.timeLineData);
    },
    addYearNode: function(data) {
      console.log(data);
      let sortDataByYearArr = [];
      let previousDate = 0;
      data.map((item, index) => {
        let currentYearDate = Number(item.frontmatter.date.split("-")[0]);
        let dateArr = item.frontmatter.date.split("-");
        let monthDay = dateArr[1] + "-" + dateArr[2]; //月日
        if (index == 0) {
          //fisrt
          item.frontmatter.date = monthDay;
          sortDataByYearArr.push(item);
          previousDate = currentYearDate;
        } else if (previousDate != currentYearDate) {
          //不同年份添加标记
          previousDate = currentYearDate;
          sortDataByYearArr.push({
            year: currentYearDate + 1,
            isyear: true
          });
          item.frontmatter.date = monthDay;
          sortDataByYearArr.push(item);
        } else {
          item.frontmatter.date = monthDay;
          sortDataByYearArr.push(item);
        }
        // 开始年份
        if (index == data.length - 1) {
          sortDataByYearArr.push({
            year: currentYearDate,
            isyear: true
          });
          // item.frontmatter.date = monthDay;
        }
      });
      console.log(sortDataByYearArr);
      return sortDataByYearArr;
    }
  }
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

    // transition: all 0.5s;
    &:hover {
      color: $accentColor;

      .zp-timeline-item__node:before {
        background-color: $accentColor;
      }

      .zp-timeline-item__year {
        cursor: auto;
        color: $textColor;
      }
    }

    .zp-timeline-item__node:before {
      content: ' ';
      left: 0.4px;
      width: 9px;
      height: 9px;
      position: absolute;
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      transition: all 0.5s;
    }

    .zp-timeline-item__yearnode {
      left: -1.6px;
      width: 13px;
      height: 13px;
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
      cursor: pointer;

      .zp-timeline-item__year {
        font-size: 25px;
        line-height: 25px;
      }

      .zp-timeline-item__content {
        cursor: pointer;
      }
    }
  }
}
</style>