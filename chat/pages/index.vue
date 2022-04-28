<template>
  <div class="container mx-auto">
      <Chat :user="user" :onMessageSend="onMessageSend" :onLogOut="onLogOut" />
    </div>
</template>

<script>
import { mapActions } from "vuex"



export default {
  name: 'IndexPage',
  middleware: 'auth',
  data(){
    return {
      messageRxd:'',
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      socket: null,
      myEmitErrors: {}
    }
  },
   async asyncData({ store,$axios }) {
    var response  = await $axios.get('api/users/online')
    const rooms = response.data

    return { rooms }
   },
  // computed:{
  //   async rooms(){
  //     return await this.$axios.get('api/users/online')
  //   }
  // },
 beforeMount () {
  this.socket = this.$nuxtSocket({ channel: '/index',
  extraHeaders: {
     Authorization: `Bearer ${this.$auth.user.token}`,
  },
  withCredentials: true })
  this.socket.on('user.connected',(newUser)=>{
     this.$store.dispatch('setUser',newUser)
     //this.$stroe.dispatch('appendMessage',`${newUser.username} connected`)
  }),
  this.socket.on('user.disconnected',(newUser)=>{
     this.$store.dispatch('setUser',newUser)
     //this.$stroe.dispatch('appendMessage',`${newUser.username} left`)
    
  })
   if (Object.values(this.$store.state.rooms).length === 0 && this.$auth.user !== null) {
      console.log('getUserOnline')
      // getOnlineUsers().then((users) => {
      //   dispatch({
      //     type: "append users",
      //     payload: users,
      //   });
      // });
      
      // getRooms(user.id).then((rooms) => {
      //   const payload = [];
      //   rooms.forEach(({ id, names }) => {
      //     payload.push({ id, name: parseRoomName(names, user.username) });
      //   });
       
      //   dispatch({
      //     type: "set rooms",
      //     payload,
      //   });
      //   dispatch({ type: "set current room", payload: "0" });
      // });
    }
},
 
methods: {
  ...mapActions({clear:'clear'}),
  async getMessage() {
    this.messageRxd = await this.socket.emitP('getMessage2', { id: 'abc123' })
  },
  // Or the old way with callback
  getMessageAlt() {
    this.socket.emit('getMessage2', { id: 'abc123' }, (resp) => {
      this.messageRxd = resp
    })
  },
  async logout() {
        await this.$auth.logout();
        await this.socket.disconnect()
        
  },
  onMessageSend(){
    //  socket.emit("message", {
    //     roomId: roomId,
    //     message,
    //     from: user.id,
    //     date: moment(new Date()).unix(),
    //   });
  },
  async onLogOut(){
    this.logout().then(() => {
      //this.setUser(null);
      /** This will clear the store, to completely re-initialize an app on the next login. */
      this.clear();
      //setLoading(true);
      this.$router.push('/login');
    });
  }
}
}
// const updateUser = (newUser, dispatch, infoMessage) => {
//   dispatch({ type: "set user", payload: newUser });
//   if (infoMessage !== undefined) {
//     dispatch({
//       type: "append message",
//       payload: {
//         id: "0",
//         message: {
//           /** Date isn't shown in the info message, so we only need a unique value */
//           date: Math.random() * 10000,
//           from: "info",
//           message: infoMessage,
//         },
//       },
//     });
//   }
// };
</script>
