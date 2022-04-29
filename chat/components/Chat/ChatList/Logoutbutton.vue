<template>
  <div
  @click="logout"
    style="cursor: 'pointer'"
    class="col-5 mt-5 gap-2 items-center text-red-600 text-right font-bold text-sm"
  >
    <font-awesome-icon :icon="['fas', 'power-off']"/><span class="pl-2">Log out</span>
  </div>  
</template>
<script>
export default 
{ 
    name:'LogoutButton',
    props:{
    onLogOut:{type:Function},
    noinfo:{type:Boolean,default:false}
    },
    data(){
        return {
            col:5
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