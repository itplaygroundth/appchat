<template>
    <div class="container mx-auto">
      <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div class="bg-gray-200 border-r border-gray-300 lg:col-span-1">
          <ChatList
            :user="user"
            :rooms="rooms"
            :onLogOut="onLogOut"
            :currentRoom="currentRoom"
          />
        </div>
        
        <div class="flex-col col-8 px-0 flex-column bg-white rounded-lg">
          <div class="px-4 py-4" style="borderBottom: 1px solid #eee">
            <h2 class="font-size-15 mb-0">{{room ? room.name : "Room"}}</h2>
          </div>
          
          <MessageList 
          :messageListElement="messageListElement"
          :user="user"
          :messages="messages"
          :room="room"
          :users="users"
          :onUserClicked="onUserClicked"
          :onLoadMoreMessages="onLoadMoreMessages"
          class=" bg-blue-200"
          />
          <!--

          
          <TypingArea
            :message="message"
            :setMessage="setMessage"
            :onSubmit="(e) => {
              e.preventDefault();
              onMessageSend(message.trim(), roomId);
              setMessage('');

              messageListElement.current.scrollTop =
                messageListElement.current.scrollHeight;
            }"
          /> -->
        </div>
      </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import MessageList from "./MessageList/index.vue"
import TypingArea from "./TypingArea/index.vue"

export default {
    name: "Chat",
    props: {
        onLogOut: { type: Function },
        user: { type: Object }
    },
    async fetch(){
   
    },
    data() {
        return {
            room: { "name": "Room" },
            dispatch: "",
            messageListElement:"elementid",
            messages:[]
        };
    },
    computed: {
        ...mapState(["currentRoom"]),
        ...mapState(["rooms"]),
        ...mapState(["users"])
    },
    methods: {
        onLoadMoreMessages(){

        },
        onUserClicked(){

        }
    },
    components: { MessageList, TypingArea }
}
</script>
 <style>
 
.navbar {
  box-shadow: rgba(18, 38, 63, 0.03) 0px 12px 24px 0px;
}

.navbar-brand {
  font-size: 16px;
}


.login-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 190px;
  height: 100vh;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.text-small {
  font-size: 0.9rem;
}



.rounded-lg {
  border-radius: 0.5rem;
}

input::placeholder {
  font-size: 0.9rem;
  color: #999;
}

.centered-box {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-error-anchor {
  position: relative;
}

.toast-box {
  text-align: left;
  margin-top: 30px;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.full-height {
  height: 100vh;
  flex-direction: column;
  display: flex;
}

.full-height .container {
  flex: 1;
}

.container .row {
  height: 100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.bg-white.flex-column {
  height: 100%;
}

.flex {
  flex: 1;
}

.logout-button {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
}

.logout-button svg {
  margin-right: 15px;
}

.no-messages {
  opacity: 0.5;
  height: 100%;
  width: 100%;
}

.avatar-box {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: 50%;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
}

.user-link {
  cursor: pointer;
}

.user-link:hover {
  text-decoration: underline;
}



span.pseudo-link {
  font-size: 14px;
  text-decoration: underline;
  color: var(--blue);
  cursor: pointer;
}

span.pseudo-link:hover {
  text-decoration: none;
}


.chat-icon {
  width: 45px;
  height: 45px;
  border-radius: 4px;
  background-color: #eee;
}

.chat-icon.active {
  background-color: var(--blue);
}

.chats-title {
  font-size: 15px;
}

.chat-body {
  border-radius: 10px !important;
}

.chat-list-container {
  height: 100%;
}

.chat-input {
  border-radius: 30px !important;
  background-color: #eff2f7 !important;
  border-color: #eff2f7 !important;
  padding-right: 120px;
}

.form-control::placeholder {
  font-size: 13px;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.94rem + 2px);
  padding: 7.5px 12px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.rounded-button {
  border-radius: 30px;
  background-color: var(--light);
}
 </style>