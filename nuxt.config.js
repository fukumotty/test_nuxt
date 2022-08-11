import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - test_nuxt',
    title: 'test_nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/constants.js',
    '~/plugins/axios.js',
    '~/plugins/days.js',
    '~/plugins/dayformat.js',
    '~/plugins/weather.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
  },
  proxy: {
    '/apiHatena/': {
      target: 'https://b.hatena.ne.jp',
      pathRewrite: { '^/apiHatena/': '' },
    },
    '/apiYahooNews/': {
      target: 'https://news.yahoo.co.jp',
      pathRewrite: { '^/apiYahooNews/': '' },
    },
    '/apiITMedia/': {
      target: 'https://rss.itmedia.co.jp',
      pathRewrite: { '^/apiITMedia/': '' },
    },
    '/apiJSONplaceholder/': {
      target: 'https://jsonplaceholder.typicode.com',
      pathRewrite: { '^/apiJSONplaceholder/': '' },
    },
    '/apiExpressHeartrails/': {
      target: 'https://express.heartrails.com',
      pathRewrite: { '^/apiExpressHeartrails/': '' },
    },
    '/apiConnpass/': {
      target: 'https://connpass.com/',
      pathRewrite: { '^/apiConnpass/': '' },
    },
    '/apiWeather/': {
      target: 'https://www.jma.go.jp/',
      pathRewrite: { '^/apiWeather/': '' },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },
      options: {
        customProperties: true
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
