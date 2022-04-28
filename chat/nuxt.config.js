export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chat',
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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-socket-io',
  ],
  axios: {
    proxy: true
  },
  
  proxy: {
    //***** auth api server */
    '/api/': { target: 'http://localhost:3003/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
  },
  // axios: {
  //   baseURL: 'http://localhost:3003/api',
  //   credentials: true
  // },
  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'api/login', method: 'post', propertyName: 'data.token' },
          user: { url: 'api/me', method: 'get', propertyName: 'data' },
          logout:  { url: 'api/logout', method: 'post', propertyName: 'data' },
        }
      }
    },
    redirect: {
      login: '/login'
    }
  },
  io: {
    // module options
    sockets: [ 
    {
      name: 'chatSvc',
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://api.uefabet.com'
          : 'http://localhost:3003',
      default: true,
      
     
     
      
    }]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
