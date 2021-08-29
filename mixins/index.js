export default {
  methods: {
    // 根据时间排序 
    $dateSortByTime: function (date) {
      return date.length > 0
        ? date.sort((a, b) => {
          return this.$getTimeToSecond(b) - this.$getTimeToSecond(a)
        })
        : []
    },
    // 获取时间的毫秒
    $getTimeToSecond: function (date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    },
    $showSubSideBar() {
      const {
        $themeConfig: { subSidebar: themeSubSidebar, sidebar: themeSidebar },
        $frontmatter: { subSidebar: pageSubSidebar, sidebar: pageSidebar }
      } = this

      const headers = this.$page.headers || []

      if ([pageSubSidebar, pageSidebar].indexOf(false) > -1) {
        return false
      } else if ([pageSubSidebar, pageSidebar].indexOf('auto') > -1 && headers.length > 0) {
        return true
      } else if ([themeSubSidebar, themeSidebar].indexOf('auto') > -1 && headers.length > 0) {
        return true
      } else {
        return false
      }
    }
  },

}