<template>
    <div class="container flex justify-center  mt-40 mx-auto ">
    <form class="bg-blue-300 w-40 p-4 shadow-2xl">
      <div class="p-3">
        <input class="bg-gray-200 focus:bg-white outline-none py-2 px-4 block w-full" type="text" v-model="email" placeholder="Username">
      </div>
      <div class="p-3">
        <input type="password" v-model="password" placeholder="Password" class="bg-gray-200 focus:bg-white outline-none py-2 px-4 block w-full">
      </div>
      <div class="p-3">
      <button @click="login" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Login
      </button>
      </div>
    </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            email:'',
            password:''
        }
    },
    mounted() {
  this.socket = this.$nuxtSocket({
    // nuxt-socket-io opts: 
    name: 'chatSvc', // Use socket "home"
    channel: '/index', // connect to '/index'

    // socket.io-client opts:
    reconnection: false
  })
},
    methods:{
     async login(e) {
        e.preventDefault();

        const payload = {
          email: this.email,
          password: this.password
        };

        try {
          await this.$auth.loginWith('local', {
            data: payload
          });
          this.$router.push('/');
        } catch (e) {
          this.$router.push('/login');
        }
      }
    }

}   
</script>
 <style type="text/css">
      @media (min-width: 768px){
      .w-40{
      width: 30%;
      }
      }
      @media (max-width: 768px){
      .w-40{
      width: 80%;
      }
      }
    </style>