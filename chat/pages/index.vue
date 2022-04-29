<template>
  <div class="container mx-auto">
      <Chat :user="user" :onMessageSend="onMessageSend" :onLogOut="onLogOut" />
    </div>
</template>

<script>
import { mapActions } from "vuex"

const parseRoomName = (names, username) => {
  for (let name of names) {
    if (typeof name !== 'string') {
      name = name[0];
    }
    if (name !== username) {
      return name;
    }
  }
  return names[0];
};

export default {
  name: 'IndexPage',
  data(){
    return {
      messageRxd:'',
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      socket: null,
      myEmitErrors: {}
    }
  },
  middleware: 'auth',
    async fetch() {
     
      // if (this.socket) {
      //       /**
      //        * The socket needs to be joined to the newly added rooms
      //        * on an active connection.
      //        */
      //       const newRooms = [];
      //       Object.keys(this.$store.state.rooms).forEach((roomId) => {
      //         const room = this.$store.state.rooms[roomId];
      //         if (room.connected) {
      //           return;
      //         }
      //         newRooms.push({ ...room, connected: true });
      //         socket.emit("room.join", room.id);
      //       });
      //       if (newRooms.length !== 0) {
      //         this.$store.dispatch("setRooms",newRooms);
      //       }
      //     } else {
      //       /**
      //        * It's necessary to set disconnected flags on rooms
      //        * once the client is not connected
      //        */
      //       const newRooms = [];
      //       Object.keys(this.$store.state.rooms).forEach((roomId) => {
      //         const room = this.$store.state.rooms[roomId];
      //         if (!room.connected) {
      //           return;
      //         }
      //         newRooms.push({ ...room, connected: false });
      //       });
      //       /** Only update the state if it's only necessary */
      //       if (newRooms.length !== 0) {
      //         this.$store.dispatch("setRooms",newRooms);
      //       }
      //     }
    

     if (Object.values(this.$store.state.rooms).length === 0 && this.$store.$auth.user !== null) {
          await this.$axios.get(`api/users/online`).then(x => x.data).then((users) => {
             //  console.log(users)
               this.$store.dispatch('appendUsers',users);
              });
          await this.$axios.get(`api/rooms/${this.$store.$auth.user.id}`).then(x => x.data).then((rooms) => {
            
           const payload = [];
           rooms.forEach(({ id, names }) => {
               payload.push({ id, name: parseRoomName(names, this.$store.$auth.user.email) });
             });
          this.$store.dispatch("setRooms",payload);
          this.$store.dispatch("setCurrentroom","0");
          })
     }
  },

 mounted () {

 this.socket = this.$nuxtSocket({ channel: '/index',
      extraHeaders: {
        Authorization: `Bearer ${this.$auth.user.token}`,
      },
      withCredentials: true })

      this.socket.on('user.connected',(newUser)=>{
        this.$store.dispatch('setUser',newUser)

      })
      this.socket.on('user.disconnected',(newUser)=>{
        this.$store.dispatch('setUser',newUser)


      })
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
<style>
body {
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  font-size: 13px;
  color: #495057;
}

</style>