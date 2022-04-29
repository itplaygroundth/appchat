<template>
<div
    class="flex gap-2 "
  >
    <div class="`align-self-center mr-3">
      <ChatAvatar :url="url" :name="user.email" :id="user.id" />
    </div>
      <div v-if="noinfo" class="flex-column">
        <h5 class="font-size-14 mt-0 mb-1">{{user.email}}</h5>
        <div class="flex items-center">
          <ChatOnlineIndicator :online=true />
          <p class="ml-2 text-muted mb-0">Active</p>
        </div>
      </div>
  </div>    
</template>
<script>
export default {
    name:'Userinfo',
    props:{
        user:{type:Object},
        noinfo:{type:Boolean,default:false}
    },
    data(){
        return {
            col:7,
            url:'https://api.lorem.space/image/face?hash=33791'
        }
    }
}
</script>
