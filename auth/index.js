
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
const channel = 'garageDoor';
const pub = new Redis({
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



  var islogin = false

  router.get('/', (req, res) => {
    return res.json({
      'message': 'Congratuation! You are Winner.'
    })
  })

  router.get('/me',verifyToken,async (req,res)=>{
    const sess = req.session;
    
      if( sess.username && libauth.token(req.token)){
        const keys = await pub.keys('*')
        var reply = JSON.stringify({
          method: 'listUsers', 
          sendType: 'sendToAllClientsInRoom',
          data: keys
      });
          pub.publish('index',reply);
          return res.json({data:{"username":sess.username}})
      }else 
          return res.json({data:{"msg":"invalid token","username":sess.usersname}})
          
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
      const sess = req.session;
      const { email, password } = req.body;
      const token = libauth.create(password)
      sess.username = email
      sess.password = password
      sess.token  = token
     // req.session.key = token
     
      return res.json({data:{"user":email,"token":token}})
  });

  router.get('/logout',(req,res)=>{
    req.session.destroy(async (err)=>{
      if(err){
          console.log(err);
      } else {
        const keys = await pub.keys('*')
        var reply = JSON.stringify({
          method: 'listUsers', 
          sendType: 'sendToAllClientsInRoom',
          data: keys
      });
          pub.publish('index',reply );
          res.end('done')
      }
  });
  })
  pub.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
  });
  pub.on('connect', function (err) {
    console.log('Connected to redis successfully');
  });


  app.use(
    session({
      store: new RedisStore({ client: pub }),
      saveUninitialized: false,
      secret: config.secret,
      resave: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
    })
  )
    
  // app.use(function (req, res, next) {
  //   if (!req.session) {
  //     return next(new Error("oh no")) // handle error
  //   }
  //   next() // otherwise continue
  // })
  app.use('/api',router)
  app.listen(port,()=>console.log(`Server Auth run on Port:${port}`))