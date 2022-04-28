<template>
    <div
    class="row no-gutters align-items-center pl-4 pr-2 pb-3"
    style="`height: 'inherit', flex: 0, minHeight: 50`"
  >
    <ChatUserInfo :user="user" :col="8" />
    <ChatLogoutbutton :onLogOut="onLogOut" :col="4" />
</div>
</template>
<script>
export default {
    name:'Footer',
    props: {
    "rooms":{type:Object},
    "user":{type:Object},
    "currentRoom":{type:String},
    "onLogOut":{type:Function}
    }
}
</script>




