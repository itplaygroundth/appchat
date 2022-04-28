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

let DEFAULT_PORT = 3003;
try {
  const newPort = parseInt(process.argv[2]);
  DEFAULT_PORT = isNaN(newPort) ? DEFAULT_PORT : newPort;
} catch (e) {
}

const PORT = env.PORT || DEFAULT_PORT;

const ipAddress = require('ip').address();

const SERVER_ID = `${ipAddress}:${PORT}`;

module.exports = { PORT, SERVER_ID , config }