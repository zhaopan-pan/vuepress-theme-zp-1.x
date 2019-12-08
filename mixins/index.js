export default {
  methods: {
    // 根据时间排序 
    _dateSortByTime: function (date) {
      return date.length > 0
        ? date.sort((a, b) => {
          return this._getTimeToSecond(b) - this._getTimeToSecond(a);
        })
        : [];
    },
    // 获取时间的毫秒
    _getTimeToSecond: function (date) {
      return parseInt(new Date(date.frontmatter.date).getTime());
    }
  },

}