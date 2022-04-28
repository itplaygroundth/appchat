<template>
<div>
     <div
      @Click="onClick"
      :class="`chat-list-item d-flex align-items-start rounded ${active ? 'bg-white' : ''}`">
      <div class="align-self-center mr-3">
        <OnlineIndicator :online="online" :hide="`${room.id === '0'}`" />
      </div>
      <div class="align-self-center mr-3">
        <AvatarImage name={name} id={userId} />
      </div>
      <div class="media-body overflow-hidden">
        <h5 class="text-truncate font-size-14 mb-1">{name}</h5>
          <p v-if="lastMessage" class="text-truncate mb-0"> {lastMessage.message} </p>
      </div>
        <div v-if="lastMessage" class="font-size-11">
          {{$moment.unix(lastMessage.date).format("LT")}}
        </div>
    </div>
    </div>

</template>
<script>
export default {
    name:'ChatListItem',
    data(){
      return {
        online:false,
        active:false,
        name:'',
        lastMessage:{message:'',date:''},
        room:'',
      }
    },
    methods:{
      onClick(){

      }
    }
}
</script>
