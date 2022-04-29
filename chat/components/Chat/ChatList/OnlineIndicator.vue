<template>
  <div :class="`w-${width} h-${height} ${online?'bg-green-700':'bg-gray'} rounded-full opacity-${hide}`"></div>
</template>
<script>
export default {
  props:{
      online:{type:Boolean,default:false},
      hide:{type:Boolean,default:false},
      width:{type:Number,default:2},
      height:{type:Number,default:2},
  }
}
</script>