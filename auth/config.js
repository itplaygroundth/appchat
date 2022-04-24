require('dotenv').config()
const env = process.env;
const config = {
  mysql:{
  host:env.MYSQL_HOST,
  db:env.MYSQL_DATABASE,
  user:env.MYSQL_ROOT_USER,
  password:env.MYSQL_ROOT_PASSWORD
},
redis: {
    host: env.REDIS_MASTER_HOST,
    port: env.REDIS_MASTER_PORT,
    password: env.REDIS_MASTER_PASSWORD 
  },
listPerPage: env.LIST_PER_PAGE || 10,
secret:env.TOKEN_SECRET

}
module.exports = config