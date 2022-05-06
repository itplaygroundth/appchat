<template>
  <div >
    <div class="py-7 px-4 w-9/12 bg-white">
    <section class="text-center text-2xl items-center">
      {{users}}
      <button class="" @click="logout">Logout</button>
    </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"


 export default {
   name:'Index',
   middleware:'auth',
   data(){
     return {
     }
   },
  //  async asyncData ({ app: { $apiservice } }) {
  //    const users = await $apiservice.getOnlineUsers()
  //    return {users}
  //  },
   async fetch(){
    
   // let users = await this.$apiservice.getOnlineUsers()
  
             //  console.log(users)
   // this.$store.dispatch('appendUsers',users);
     
   // console.log(this.users)
   // this.$store.dispatch('setUsers',this.users)
   },
   computed:{
     ...mapState(['users'])
   },
   mounted () {

 this.socket = this.$nuxtSocket({ channel: '/index',
      extraHeaders: {
        Authorization: `Bearer ${this.$auth.user.token}`,
      },
      withCredentials: true })

      this.socket.on('user.connected',async (newUser)=>{
        console.log(newUser)
      //  this.$store.dispatch('appendUsers',newUser)

      })
      this.socket.on('user.disconnected',(newUser)=>{
        //this.$store.dispatch('setUser',newUser)
      })
      this.socket.on('message',(message)=>{
        console.log(message)
      })
},
  //  async fetch({context:}){
  //      const rooms = await ApiService(context.$axios).getRooms(0)
  //      const users = await ApiService(context.$axios).getOnlineUsers()
  //     return {}
  //  },
   methods:{
     async logout() {
        await this.$auth.logout();
        this.$router.push('/login');

  }
  }
 }
</script>
