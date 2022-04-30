<template>
    <div className="p-3 chat-input-section">
    <form className="row" @submit="submit">
      <div className="col">
        <div className="position-relative">
          <input
            type="text"
            @input="(event)=>this.$emit('setMessage',event)"
            placeholder="Enter Message..."
            className="form-control chat-input"
          />
          
        </div>
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="btn btn-primary btn-rounded chat-send w-md"
        >
          <span className="d-none d-sm-inline-block mr-2">Send</span>
          <svg width=13 height=13 viewBox="0 0 24 24" tabIndex=-1>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white" />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
    props:{
        onSubmit:{type:Function}
    },
    
    methods:{
        submit(e){
          this.onSubmit(e)
        }
    }
   
}
</script>