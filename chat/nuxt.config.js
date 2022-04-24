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
    '/api/': { target: 'http://localhost:3003/api', pathRewrite: {'^/api/': ''}, changeOrigin: true }
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
          logout: false
        }
      }
    },
    redirect: {
      login: '/login'
    }
  },
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:3000',
      vuex:{},
      namespace:{
        '/index': {
          emitters: ['getMessage2 + testMsg --> message2Rxd'],
          listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
        },
        '/examples': {
          emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
          emitters: [
            'reset] getProgress + refreshInfo --> progress [handleDone'
          ],
          listeners: ['progress']
        },
        '/rooms':{
          emitters:['getRooms --> rooms']
        },
        '/room':{
          emitters:[
            'joinRoom + joinMsg --> roomInfo',
            'leaveRoom + leaveMsg'
          ],
          listeners:['joinedRoom [updateUsers','lefRoom [updateUsers']
        },
        '/channel':{
          emitters:[
            'joinChannel + joinMsg --> channelInfo',
            'leaveChannel + leaveMsg',
            'sendMsg + userMsg --> msgRxd [appendChats'
          ],
          listeners:[
            'joinedChannel [updateChannelInfo',
            'lefChannel [updateChannelInfo',
            'chatMessage [appendChats'
          ]
        }
      }
    },
    {
      name: 'chatSvc',
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://api.uefabet.com'
          : 'http://localhost:3002'
    }]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
