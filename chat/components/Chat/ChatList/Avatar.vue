<template>
        <div v-if="name!=='General'">
        <img
          :src="url"
          :alt="name"
          style="width: 32, height: 32, objectFit: 'cover'"
          class="rounded-circle avatar-xs"
        />
        </div>
        <div v-else class="overflow-hidden rounded-circle">
          <ChatIcon />
        </div>
</template>
<script>
export default {
    props:[ 'url',
            'name'],
    data(){
        return {
           
        }
    }
}
</script>