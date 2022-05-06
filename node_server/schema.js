const schema = {
    type: 'object',
    required: ['REDIS_MASTER_HOST', 'REDIS_MASTER_PASSWORD','REDIS_MASTER_PORT','PORT','TOKEN_SECRET','SESSION_TTL','WHITELIST'],
    properties: {
        REDIS_MASTER_HOST: {
        type: 'string'
      },
      REDIS_MASTER_PASSWORD: {
        type: 'string'
      },
      REDIS_MASTER_PORT: {
        type: 'string'
      },
      PORT:{
        type: 'string',
        default: 3002
      },
      TOKEN_SECRET:{
          type: 'string',
      },
      SESSION_TTL:{
          type: 'string'
      },
      WHITELIST: {
        type:'string'
      } 
      
    }
  }
  exports = module.exports = schema