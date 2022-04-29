<template>
     <div
      @Click="onClick"
      :class="`chat-list-item d-flex align-items-start rounded ${active ? 'bg-white' : ''}`">
      <div class="align-self-center mr-3">
        <ChatOnlineIndicator :online="cdata.online" :hide="room.id === '0'" />
      </div>
      <div class="align-self-center mr-3">
        <ChatAvatar :name="cdata.name" :id="cdata.userId" />
      </div>
      <div class="media-body overflow-hidden">
        <h5 class="text-truncate font-size-14 mb-1">{{cdata.name}}</h5>
          <p v-if="cdata.lastMessage" class="text-truncate mb-0"> {{cdata.lastMessage.message}} </p>
      </div>
        <div v-if="cdata.lastMessage" class="font-size-11">
          {{$moment.unix(cdata.lastMessage.date).format("LT")}}
        </div>
    </div>
</template>
<script>

const useChatListItemHandlers = (room,$store) => {
  const { id, name } = room;
  let userId = 1
  let lastMessage ={message:'',date:''}
  //const [state] = useAppState();
  let isUser = true
  let online = true

   //const [isUser, online, userId] = useMemo(() => {
     try {
       let pseudoUserId = Math.abs(parseInt(id.split(":").reverse().pop()));
       isUser = pseudoUserId > 0;
       const usersFiltered = Object.entries($store.state.users)
         .filter(([, user]) => user.username === name)
         .map(([, user]) => user);
          online = false;
       if (usersFiltered.length > 0) {
         online = usersFiltered[0].online;
         pseudoUserId = +usersFiltered[0].id;
       }
       userId = pseudoUserId
       //return [isUser, online, pseudoUserId];
     } catch (_) {
       return [false, false, "0"];
     }
   //}, [id, name, state.users]);

   lastMessage = useLastMessage(room);

  return {
    isUser,
    online,
    userId,
    name: room.name,
    lastMessage,
  };
};

 const useLastMessage = (room) => {
//   const [, dispatch] = useAppState();
 const { lastMessage } = room;
//   useEffect(() => {
     if (lastMessage === undefined) {
//       /** need to fetch it */
       if (room.messages === undefined) {
//         getMessages(room.id, 0, 1).then((messages) => {
//           let message = null;
//           if (messages.length !== 0) {
//             message = messages.pop();
//           }
//           dispatch({
//             type: "set last message",
//             payload: { id: room.id, lastMessage: message },
//           });
//         });
       } else if (room.messages.length === 0) {
//         dispatch({
//           type: "set last message",
//           payload: { id: room.id, lastMessage: null },
//         });
       } else {
//         dispatch({
//           type: "set last message",
//           payload: {
//             id: room.id,
//             lastMessage: room.messages[room.messages.length - 1],
//           },
//         });
       }
     }
//   }, [lastMessage, dispatch, room]);

//   return lastMessage;
 };
export default {
    props:{
      room:{type:Object},
      //name:{type:String},
      //online:{type:Boolean,default:false},
      active:{type:Boolean,default:false}
    },
    data(){
      return {
        //lastMessage:{message:'',date:''},
        //userId:'',
        //name:'',
        //isUser:false,
        //online:false
        
      }
    },
   computed:{
    cdata(){     
      const  data  = useChatListItemHandlers(this.room,this.$store);
      return data
    }
  //  return  {
  //   isUser,
  //   online,
  //   userId,
  //   name,
  //   lastMessage,
  // } = data
    },

    methods:{
      onClick(){

      }
    }
}
</script>
