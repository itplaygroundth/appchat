const express = require('express')
const router = express.Router();
const libauth = require('../lib/auth')
const bcrypt = require("bcrypt");
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
} = require("../lib/redis");

const verifyToken = (req, res, next)=> {
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

var random_name = require('node-random-name');
router.get('/', (req, res) => {
    return res.json({
      'message': 'Congratuation! You are Winner.'
    })
  })

  // router.get('/me',verifyToken,async (req,res)=>{
      
      
  //     const {sess} = req.session;
      
  //     if( sess && libauth.token(req.token)){
  //       const keys = await pub.keys('*')
  //       var reply = JSON.stringify({
  //         method: 'listUsers', 
  //         sendType: 'sendToAllClientsInRoom',
  //         data: keys
  //     });
  //         pub.publish('index',reply);
  //         return res.json({data:{"username":sess.username}})
  //     }else 
  //         return res.json({data:{"msg":"invalid token","username":sess}})
          
  // })

 
  router.get("/randomname", (_, res) => {
    return res.send(randomName({ first: true }));
  });

  router.get("/me", (req, res) => {
    
    const { user } = req.session;
    if (user) {
      return res.json({data:user});
    }
    /** User not found */
    return res.json(null);
  });
 
  const auth = (req, res, next) => {
    if (!req.session.user) {
      return res.sendStatus(403);
    }
    next();
  };
    router.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const sess = req.session;
      const usernameKey = libauth.makeUsernameKey(email);
      const userExists = await exists(usernameKey);
      
      if (!userExists) {
        const newUser = await libauth.createUser(email, password);
        req.session.user = newUser;
        return res.status(201).json(newUser);
      } else {
        const userKey = await get(usernameKey);
        const data = await hgetall(userKey);
  
        if (await bcrypt.compare(password, data.password)) {
          const uid = userKey.split(":").pop()
          const token = libauth.retoken(uid)          
          const user = { id: uid, email ,token};
          req.session.user = user;
          
          return res.status(200).json(user);
        }
      }

      // user not found
      return res.status(404).json({ message: "Invalid username or password" });
    });

  router.get(`/users`, async (req, res) => {

      const ids = req.query.ids;
      if (typeof ids === "object" && Array.isArray(ids)) {
      
        const users = {};
        for (let x = 0; x < ids.length; x++) {
          /** @type {string} */
          const id = ids[x];
          const user = await hgetall(`user:${id}`);
          users[id] = {
            id: id,
            username: user.username,
            online: !!(await sismember("online_users", id)),
          };
        }
        return res.send(users);
      }
      return res.sendStatus(404);
    });
 
  router.get(`/users/online`, auth, async (req, res) => {
    const onlineIds = await smembers(`online_users`);
    const users = {};
    for (let onlineId of onlineIds) {
      const user = await hgetall(`user:${onlineId}`);
      users[onlineId] = {
        id: onlineId,
        username: user.username,
        online: true,
      };
    }
    return res.send(users);
  });
  router.post("/logout", auth, (req, res) => {
    req.session.destroy(() => {});
    return res.sendStatus(200);
  });

  
  router.post("/room", auth, async (req, res) => {
    const { user1, user2 } = {
      user1: parseInt(req.body.user1),
      user2: parseInt(req.body.user2),
    };

    const [result, hasError] = await createPrivateRoom(user1, user2);
    if (hasError) {
      return res.sendStatus(400);
    }
    return res.status(201).send(result);
  });

  /** Fetch messages from the general chat (just to avoid loading them only once the user was logged in.) */
  router.get("/room/0/preload", async (req, res) => {
    const roomId = "0";
    try {
      let name = await get(`room:${roomId}:name`);
      
      const messages = await getMessages(roomId, 0, 20);
      return res.status(200).send({ id: roomId, name, messages });
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  /** Fetch messages from a selected room */
  router.get("/room/:id/messages", auth, async (req, res) => {
    const roomId = req.params.id;
    const offset = +req.query.offset;
    const size = +req.query.size;
    try {
      const messages = await getMessages(roomId, offset, size);
      return res.status(200).send(messages);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  router.get(`/rooms/:userId`, auth, async (req, res) => {
    const userId = req.params.userId;
    /** We got the room ids */
    const roomIds = await smembers(`user:${userId}:rooms`);
    
    const rooms = [];
    for (let x = 0; x < roomIds.length; x++) {
      const roomId = roomIds[x];
    
      let name = await get(`room:${roomId}:name`);
      
      /** It's a room without a name, likey the one with private messages */
      if (!name) {
        /**
         * Make sure we don't add private rooms with empty messages
         * It's okay to add custom (named rooms)
         */
        const roomExists = await exists(`room:${roomId}`);
       
        if (!roomExists) {
          continue;
        }

        const userIds = roomId.split(":");
        
        if (userIds.length !== 2) {
          return res.sendStatus(400);
        }
        rooms.push({
          id: roomId,
          names: [
            await hmget(`user:${userIds[0]}`, "username"),
            await hmget(`user:${userIds[1]}`, "username"),
          ],
        });
      } else {
        rooms.push({ id: roomId, names: [name] });
      }
    }
    res.status(200).send(rooms);
  })

 
module.exports = router