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
    
    // '~/assets/css/style.css',
    // '~/assets/css/font-face.css',
    // '~/assets/css/style-overrides.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
        {
          path: '~/components/Chat/ChatList/',
          prefix: 'Chat'
        },
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'nuxt-fontawesome', {
        imports: [
         {
           set: '@fortawesome/free-solid-svg-icons',
           icons: ['fas']
         },
         {
           set:'@fortawesome/free-brands-svg-icons',
           icons: ['fab']
         }
       ]
      }
    ],
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
  moment: {
    locales: ['th']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
