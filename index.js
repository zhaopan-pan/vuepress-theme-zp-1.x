const path = require('path')
/////////////////
// Theme API.
module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia
      || Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    }
  },
  layoutDir: 'layouts',
  plugins: [
    ['@vuepress/active-header-links', options.activeHeaderLinks],
    [
      '@vuepress/blog',
      {
        directories: [
          // {
          //   id: 'Tags',
          //   dirname: 'Tags',
          //   path: '/',
          //   // layout: 'IndexPost', defaults to `Layout.vue`
          //   itemLayout: 'Tags',
          //   itemPermalink: '/:year/:month/:day/:slug',
          //   pagination: {
          //     lengthPerPage: 5,
          //   },
          // },
        ],
        frontmatters: [
          {
            id: "tags",
            keys: ['tag'],//注册到元数据中的key
            path: '/tag/',
            layout: 'Tags',  //defaults to `FrontmatterKey.vue`
            frontmatter: { title: 'Tag', sidebar: true },//注册页面的自定义元数据
            pagination: {
              lengthPerPage: 5
            }
          },
        ]
      },
    ],
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    ['container', {
      type: 'tip',
      defaultTitle: {
        '/zh/': '提示'
      }
    }],
    ['container', {
      type: 'warning',
      defaultTitle: {
        '/zh/': '注意'
      }
    }],
    ['container', {
      type: 'danger',
      defaultTitle: {
        '/zh/': '警告'
      }
    }]
  ]
})
