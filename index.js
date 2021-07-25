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
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    [
      '@vuepress/plugin-blog',
      {
        permalink: '/:regular',
        frontmatters: [
          {
            id: "tags",
            keys: ['tag'],//注册到元数据中的key
            path: '/tag/',
            layout: 'Tags',  //defaults to `FrontmatterKey.vue`
            frontmatter: { title: 'Tag', sidebar: true, isTag: true },//注册页面的自定义元数据
            scopeLayout: 'Tag'
          },
          {
            id: 'categories',
            keys: ['category'],
            path: '/categories/',
            frontmatter: { title: 'Category', sidebar: true },//注册页面的自定义元数据
            layout: 'Category',
            scopeLayout: 'Category'
          },
        ]
      },
    ],
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
