


export const MESSAGES_TO_LOAD = 15;
const url = x => `/api${x}`;

export class ApiService{
  constructor($axios) {
    this.$axios = $axios
  }

async getRandomName() {
  return this.$axios.get(url('/randomname')).then(x => x.data);
}
getMessages(id,
  offset = 0,
  size = MESSAGES_TO_LOAD
){
  return this.$axios.get(url(`/room/${id}/messages`), {
    params: {
      offset,
      size
    }
  })
    .then(x => x.data.reverse());
}
async getPreloadedRoom(){
  return this.$axios.get(url(`/room/0/preload`)).then(x => x.data);
}
getUsers(ids){
  return this.$axios.get(url(`/users`), { params: { ids } }).then(x => x.data);
}
getOnlineUsers(){
  return this.$axios.get(url(`/users/online`)).then(x => x.data);
}
async addRoom(user1, user2){
  return this.$axios.post(url(`/room`), { user1, user2 }).then(x => x.data);
}
async getRooms(userId){
  return this.$axios.get(url(`/rooms/${userId}`)).then(x => x.data);
}

}
