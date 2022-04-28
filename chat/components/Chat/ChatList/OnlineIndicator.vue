<template>
    <div
      :class="`${online?'rounded-circle bg-success':'rounded-circle bg-gray'}`"
      :style="`width:${width},height:${height}, opacity: ${hide ? 0 : 1 }}`"
    ></div>
</template>
<script>
export default {
  name:'OnlineIndicator',
  props:{
      online:{type:Boolean,default:false},
      hide:{type:Boolean,default:false},
      width:{type:Number,default:8},
      height:{type:Number,default:8},
  },
  data(){
  return {
  }
  }
}
</script>