<template>
    <div
    :ref="messageListElement"
    className="chat-box-wrapper position-relative d-flex">
    
   <div v-if="!messages">Load Message</div>
   <div v-else-if="messages.length==0">
       No Message
    </div>
    <div className="px-4 pt-5 chat-box position-absolute">
            <div className="d-flex flex-row align-items-center mb-4">
              <div
                style="height: 1;backgroundColor: #eee;flex: 1;"
              ></div>
              <div className="mx-3">
                <button
                  aria-haspopup="true"
                  aria-expanded="true"
                  type="button"
                  @Click="onLoadMoreMessages"
                  className="btn rounded-button btn-secondary nav-btn"
                   
                >
                  Load more
                </button>
              </div>
              <div
                style="height: 1; backgroundColor: #eee; flex: 1;"
              ></div>
            </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        messageListElement:{type:Object},
        user: { type: Object },
        messages:{type:Array},
        room:{type:Object},
        users:{type:Object},
        onUserClicked:{type:Function},
        onLoadMoreMessages:{type:Function}

    } 
    
    
}
</script>