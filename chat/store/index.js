export const state = () => ({
  currentRoom: "main",
  rooms: {},
  users: {},
  })

  export const actions = {
    async clear({commit}){
      commit('CLEAR')
    },
    async setUser({commit},payload){
      commit('SET_USER',payload)
    },
    async makeUserOnline({commit},payload){
      commit('MAKE_USER_ONLINE',payload)
    },
    async setCurrentroom({commit},room){
      commit('SET_CURRENT_ROOM',room)
    }
  }

  export const mutations = {
    CLEAR(state){
      state.currentRoom="0"
      state.rooms={}
      state.users={} 
    },
    SET_USER(state,payload){
      
      state.users = { ...state.users, [payload.uid]: payload }
    },
    MAKE_USER_ONLINE(state,payload){
      state.users = { ...state.users,[payload]: { ...state.users[payload], online: true }}
    },
    SET_CURRENT_ROOM(state,room){
      state.currentRoom = room
    }
  
  }
/*
 export const action = (state, action) => {
    switch (action.type) {
      case "clear":
        return { currentRoom: "0", rooms: {}, users: {} };
      case "set user": {
        return {
          ...state,
          users: { ...state.users, [action.payload.id]: action.payload },
        };
      }
      case "make user online": {
        return {
          ...state,
          users: {
            ...state.users,
            [action.payload]: { ...state.users[action.payload], online: true },
          },
        };
      }
      case "append users": {
        return { ...state, users: { ...state.users, ...action.payload } };
      }
      case "set messages": {
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [action.payload.id]: {
              ...state.rooms[action.payload.id],
              messages: action.payload.messages,
              offset: action.payload.messages.length,
            },
          },
        };
      }
      case "prepend messages": {
        const messages = [
          ...action.payload.messages,
          ...state.rooms[action.payload.id].messages,
        ];
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [action.payload.id]: {
              ...state.rooms[action.payload.id],
              messages,
              offset: messages.length,
            },
          },
        };
      }
      case "append message":
        if (state.rooms[action.payload.id] === undefined) {
          return state;
        }
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [action.payload.id]: {
              ...state.rooms[action.payload.id],
              lastMessage: action.payload.message,
              messages: state.rooms[action.payload.id].messages
                ? [
                  ...state.rooms[action.payload.id].messages,
                  action.payload.message,
                ]
                : undefined,
            },
          },
        };
      case 'set last message':
        return { ...state, rooms: { ...state.rooms, [action.payload.id]: { ...state.rooms[action.payload.id], lastMessage: action.payload.lastMessage } } };
      case "set current room":
        return { ...state, currentRoom: action.payload };
      case "add room":
        return {
          ...state,
          rooms: { ...state.rooms, [action.payload.id]: action.payload },
        };
      case "set rooms": {
        
        const newRooms = action.payload;
        const rooms = { ...state.rooms };
        newRooms.forEach((room) => {
          rooms[room.id] = {
            ...room,
            messages: rooms[room.id] && rooms[room.id].messages,
          };
        });
        return { ...state, rooms };
      }
      default:
        return state;
    }
  };
  */
  