<template>
  <div
    
    style="cursor: 'pointer'"
    :class="`col-${col} text-danger ${!noinfo ? 'text-right' : ''}`"
  >
      <button @click="logout" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Logout
      </button>
  </div>  
</template>
<script>
export default 
{ 
    name:'LogoutButton',
    props:{
    onLogOut:{type:Function},
    },
    data(){
        return {
            col:5,
            noinfo:false
        }
    },
    mounted() {
    // Pass a value to the parent through the function
    //this.onLogOut();
  },methods:{
      logout(){
         
          this.onLogOut()
      }
  }
}
</script>