<template>
  <div class="timeline-page">
    <ul class="zp-timeline">
      <li class="zp-timeline-item" :key="index" v-for="(item,index) in timeLineData">
        <div :class="!item.isyear?'zp-timeline-item__node':'zp-timeline-item__yearnode'"></div>
        <div class="zp-timeline-item__line" v-show="index<timeLineData.length-1"></div>
        <div class="zp-timeline-item__wrapper">
          <div class="zp-timeline-item__content" v-show="!item.isyear">{{item.title||""}}</div>
          <div
            :class="item.isyear?'zp-timeline-item__year':'zp-timeline-item__timestamp'"
          >{{item.isyear?item.year||"":item.frontmatter.date||""}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateSortByTime } from "../util";

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
    createTimeLineData: function() {
      console.log(this.$site.pages);
      let allPageData = this.$site.pages;
      if (allPageData.length == 0) return;
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
        console.log(item);
        let dateArr = item.frontmatter.date.split("-");
        let monthDay = dateArr[1] + "-" + dateArr[2]; //月日
        console.log(monthDay);
        if (index == 0) {
          //fisrt
          item.frontmatter.date = monthDay;
          sortDataByYearArr.push(item);
          previousDate = currentYearDate;
        } else if (previousDate != currentYearDate) {
          //不同年份添加标记
          previousDate = currentYearDate;
          sortDataByYearArr.push({
            year: currentYearDate,
            isyear: true
          });
          item.frontmatter.date = monthDay;
          sortDataByYearArr.push(item);
        } else {
          item.frontmatter.date = monthDay;
          sortDataByYearArr.push(item);
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
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      color: $accentColor;

      .zp-timeline-item__node:before {
        background-color: $accentColor;
      }
    }

    .zp-timeline-item__node:before {
      content: ' ';
      left: 0px;
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
      left: -2px;
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