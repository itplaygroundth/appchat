<template>
<div
    :class="`col-${col} d-flex align-items-center ${noinfo ? 'justify-content-end' : ''
    }`"
  >
    <div :class="`align-self-center ${noinfo ? '' : 'mr-3'}`">
      <ChatAvatar :name="user.username" :id="user.id" />
    </div>
      <div v-if="!noinfo" class="media-body">
        <h5 class="font-size-14 mt-0 mb-1">{{user.username}}</h5>
        <div class="d-flex align-items-center">
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
        user:{type:Object}
    },
    data(){
        return {
            col:7,
            noinfo:false
        }
    }
}
</script>
