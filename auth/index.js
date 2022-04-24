
const moment = require('moment-timezone');
moment().tz("Asia/Bangkok").format();
require('dotenv').config()
const libauth = require('./lib/auth'),
express = require('express'),
session = require("express-session"),
bodyParser = require('body-parser'),
cors = require('cors'),
Redis = require("ioredis"),
app = express()
const config = require('./config')
let RedisStore = require("connect-redis")(session)
const redis = new Redis({
    port: config.redis.port, // Redis port
    host: config.redis.host, // Redis host
    username: "default", // needs Redis >= 6
    password: config.redis.password,
    db: 0, // Defaults to 0
  });

var random_name = require('node-random-name');

const router = express.Router();
const port = 3003 || process.env.PORT
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  app.use(cors(corsOpts))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      saveUninitialized: false,
      secret: config.secret,
      resave: false,
    })
  )
  var islogin = false

  router.get('/', (req, res) => {
    return res.json({
      'message': 'Congratuation! You are Winner.'
    })
  })

  router.get('/me',verifyToken,(req,res)=>{
      
      if(libauth.token(req.token)){
          return res.json({data:{"username":random_name()}})
      }else 
          return res.json({data:{"msg":"invalid token"}})
  })

  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      
      const bearerToken = bearer[1];
      
      req.token = bearerToken;
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

  router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const token = libauth.create(password)
      
      return res.json({data:{"user":email,"token":token}})
  });

  app.use('/api',router)
  app.listen(port,()=>console.log(`Server Auth run on Port:${port}`))