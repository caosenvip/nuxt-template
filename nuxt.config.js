/*
 * @Author: casen
 * @Date: 2021-03-23 11:40:11
 * @LastEditors: casen
 * @LastEditTime: 2021-03-23 17:22:06
 * @FilePath: /nuxt-template/nuxt.config.js
 */
export default {
  mode: 'universal', // mode:模式属性 spa-无服务器端渲染（仅客户端导航） universal(默认值)-同构应用程序（服务器端呈现+客户端导航）
  target: 'server', // target:模式属性 server(默认值)-服务器托管SSR static-静态站点
  // 关闭加载进度条
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'element-ui/lib/theme-chalk/index.css'
    '@assets/css/base.styl',
    '@assets/css/page-transletion.css' // 页面跳转过渡动画
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/element-ui',
    {
      src: '@/plugins/element-ui',
      ssr: true // 开启ssr
    },
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/utils'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // 配置对less、sass、stylus预处理器变量，函数或者混合的支持
    '@nuxtjs/style-resources'
  ],

  // 这里的路径不能使用~或者@等路径别名, 全局引入了stylus变量
  styleResources: {
    stylus: './assets/css/global.styl'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // 配置页面渲染返回顶部
  router: {
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    // 重定向路由
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/index',
        redirect: '/'
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: { allChunks: true }, // 页面中css提取到link
    // transpile: [/^element-ui/]
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    }
  }
}
