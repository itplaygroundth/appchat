//@ts-nocheck
import { io, Socket } from "socket.io-client";
 
export interface Message {
      from: string
      date: number
      message: string
      roomId: string
     }
    
export interface Room {
       name: string;
       id: string;
       messages?: Message[]
       connected?: boolean;
       offset?: number;
       forUserId?: null | number | string
       lastMessage?: Message | null
     }
    
export interface UserEntry {
       username: string;
       id: string;
       online?: boolean;
       room?: string;
     }
    
export interface State {
      currentRoom: string;
      rooms: {[id: string]: Room};
      users: {[id: string]: UserEntry}
     }

export interface RootState {
    currentRoom: string,
    rooms: Room,
    users: UserEntry[],
    socket: Object
}

export const state = ():RootState => ({
    currentRoom: "main",
    rooms: {name:'',id:'',messages:[],
    connected:false,offset:0,forUserId:null,
    lastMessage:{from:'',date:0,message:'',roomId:''}},
    users: [{username:'',id:'',online:false,room:''}],
    socket: {}
    })
  
const getters = {}
export const mutations = {
  
  SET_USERS({state},payload){
    state.users = {...state.users,payload}
  },
  APPEND_USERS(state,payload){
    state.users = {...state.users, ...payload } ;
  },
}
export const actions = {
  
  //@ts-ignore
    setUsers({commit},payload){
      commit('SET_USERS',payload)
    },
    appendUsers({commit},payload){
      commit('APPEND_USERS',payload)
    }
}

const store = ()=>{
  state
 
}
export {store}