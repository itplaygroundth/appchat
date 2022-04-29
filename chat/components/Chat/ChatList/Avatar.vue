<template>
        <div v-if="name!=='General'">
        <img
          :src="url"
          :alt="name"
          style="width:32;height:32;objectFit:'cover';"
          class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        />
        </div>
        <div v-else class="overflow-hidden rounded-circle">
          <ChatIcon />
        </div>
</template>
<script>
export default {
    props:[ 'url',
            'name','id'],
    data(){
        return {
           
        }
    }
}
</script>