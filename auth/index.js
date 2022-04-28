
const moment = require('moment-timezone');
moment().tz("Asia/Bangkok").format();
require('dotenv').config()

const { createDemoData } = require("./demo-data");
express = require('express'),
session = require("express-session"),
bodyParser = require('body-parser'),
cors = require('cors'),

app = express()
const {config ,SERVER_ID } = require('./config')
let RedisStore = require("connect-redis")(session)
const channel = 'support';
const jwt = require('jsonwebtoken');
const {
  client: redisClient,
  exists,
  set,
  get,
  hgetall,
  sadd,
  zadd,
  hmget,
  smembers,
  sismember,
  srem,
  sub,
  auth: runRedisAuth,
} = require("./lib/redis");
 



const router = require('./route')
const port = 3003 || process.env.PORT





  var islogin = false
  const server = require("http").createServer(app);
  io = require('socket.io')(server,{
    cors: {
        origin: ["http://localhost:3000","https://uefabot.com"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
      }
  })
  

  const sessionMiddleware =
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: config.secret,
      resave: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
    })
  
  const auth = (req, res, next) => {
    if (!req.session.user) {
      return res.sendStatus(403);
    }
    next();
  };
  
  const publish = (type, data) => {
    const outgoing = {
      serverId: SERVER_ID,
      type,
      data,
    };
    redisClient.publish("MESSAGES", JSON.stringify(outgoing));
  };
  
  const initPubSub = () => {
    
    sub.on("message", (_, message) => {
      
      const { serverId, type, data } = JSON.parse(message);
    
      if (serverId === SERVER_ID) {
        return;
      }
      io.emit(type, data);
    });
    sub.subscribe("MESSAGES");
  };
  
  async function runApp() {
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
    app.use(sessionMiddleware)
    app.use(cors(corsOpts))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    initPubSub()
    io.use((socket, next) => {
      sessionMiddleware(socket.request, socket.request.res || {}, next);
      // sessionMiddleware(socket.request, socket.request.res, next); will not work with websocket-only
      // connections, as 'socket.request.res' will be undefined in that case
    });
  
    async function getUser(socket) {
      const token = socket.request.headers.authorization.split(' ')[1]
      if (!token) {
        return null
      }
      const jwtData = jwt.decode(token,config.secret)
      
      const user = jwtData.data
      //**** find id in database */
      //const user = await User.find(jwtData.uid)
      return user
    }
  
    io.of("/index")
    .use(async (socket, next) => {
      socket.user = await getUser(socket)
      next()
    })
    .on("connection", async (socket) => {
      console.log('connected....',socket.user.uid)
      if (socket.user.uid === undefined) {
        return;
      }
      const userId = socket.user.uid;
      
      await sadd("online_users", userId);
  
      const msg = {
        ...socket.user,
        online: true,
      };
  
      publish("user.connected", msg);
      socket.broadcast.emit("user.connected", msg);
  
      socket.on("room.join", (id) => {
        socket.join(`room:${id}`);
      });
  
      socket.on(
        "message",
      
        async (message) => {
          /** Make sure nothing illegal is sent here. */
          message = { ...message, message: sanitise(message.message) };
          /**
           * The user might be set as offline if he tried to access the chat from another tab, pinging by message
           * resets the user online status
           */
          await sadd("online_users", message.from);
          /** We've got a new message. Store it in db, then send back to the room. */
          const messageString = JSON.stringify(message);
          const roomKey = `room:${message.roomId}`;
          /**
           * It may be possible that the room is private and new, so it won't be shown on the other
           * user's screen, check if the roomKey exist. If not then broadcast message that the room is appeared
           */
          const isPrivate = !(await exists(`${roomKey}:name`));
          const roomHasMessages = await exists(roomKey);
          if (isPrivate && !roomHasMessages) {
            const ids = message.roomId.split(":");
            const msg = {
              id: message.roomId,
              names: [
                await hmget(`user:${ids[0]}`, "username"),
                await hmget(`user:${ids[1]}`, "username"),
              ],
            };
            publish("show.room", msg);
            socket.broadcast.emit(`show.room`, msg);
          }
          await zadd(roomKey, "" + message.date, messageString);
          publish("message", message);
          io.to(roomKey).emit("message", message);
        }
      );
      socket.on("disconnect", async () => {
        const userId = socket.user.id;
        await srem("online_users", userId);
        const msg = {
          ...socket.user,
          online: false,
        };
        publish("user.disconnected", msg);
        socket.broadcast.emit("user.disconnected", msg);
      });
    })


    
    
    app.use('/',router)
  }
  
  (async () => {
    await runRedisAuth();
    /** We store a counter for the total users and increment it on each register */
    const totalUsersKeyExist = await exists("total_users");
    if (!totalUsersKeyExist) {
      /** This counter is used for the id */
      await set("total_users", 0);
      /**
       * Some rooms have pre-defined names. When the clients attempts to fetch a room, an additional lookup
       * is handled to resolve the name.
       * Rooms with private messages don't have a name
       */
      await set(`room:${0}:name`, "General");
  
      /** Create demo data with the default users */
      await createDemoData();
    }
    runApp()
  })()

  
  server.listen(port,()=>console.log(`Server Auth run on Port:${port}`))