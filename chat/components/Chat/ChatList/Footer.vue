<template>
   <div class="flex no-gutters align-items-center pl-4 pr-2 pb-3 " style="height:'inherit';flex:0;minHeight:50;">
   <ChatUserInfo :noinfo="true" :user="user" col=4 />
   <ChatLogoutbutton :noinfo="true" :onLogOut="onLogOut" col=8 />
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




