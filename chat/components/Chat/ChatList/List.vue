<template>
    <div class="chat-list-container flex-column d-flex pr-4">
        <div class="py-2">
          <p class="h5 mb-0 py-1 chats-title font-bold">Chats</p>
        </div>
        <div class="messages-box flex-1">
          <div class="list-group rounded-0">
            <div v-for="(room,i) in processedRooms" :key="i">
              <ChatListItem
                :key="room.id"
                @click="setRoom(room.id.toString())"
                :active="currentRoom === room.id"
                :room="room"
              />
            </div>
          </div>
        <ChatFooter :user="user" :onLogOut="onLogOut" />
      </div>
      </div>
</template>
<script>
import { mapActions } from "vuex";



export default {
    props:
    {
    "rooms":{type:Object},
    "user":{type:Object},
    "currentRoom":{type:String},
    "onLogOut":{type:Function}
    },
    data(){
        return {

        }
    },
    computed:{
        processedRooms(){
            const roomsList = Object.values(this.rooms);
            const main = roomsList.filter((x) => x.id === "0");
            let other = roomsList.filter((x) => x.id !== "0");
            other = other.sort(
                 (a, b) => +a.id.split(":").pop() - +b.id.split(":").pop()
             );
            return [...(main ? main : []), ...other];
        }
    },
    methods:{
      ...mapActions(['setRoom'])

    }
}
</script>
<style scoped>

.list-group-item {
  cursor: pointer;
  height: 70px;
  box-sizing: border-box;
  transition: background-color 0.1s ease-out;
}
.chats-title {
  padding-left: 14px;
}

.messages-box,
.chat-box {
  /* height: 510px; */
  width: 100%;
}

.chat-box-wrapper {
  flex: 1;
  overflow-y: scroll;
}
</style>
