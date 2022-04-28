const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
// const {
//   client: redisClient,
//   exists,
//   set,
//   get,
//   hgetall,
//   sadd,
//   zadd,
//   hmget,
//   smembers,
//   sismember,
//   srem,
//   pub,
//   auth: runRedisAuth,
// } = require("./redis");
const { incr, set, hmset, sadd, hmget, exists,
  client: redisClient,
} = require('./redis');
module.exports = {
    create: (password) => {
        try {
            const hashedPassword = bcrypt.hashSync(password,salt);
            return hashedPassword;
        } catch(e) {
           return { message: "Error"};
        }
    },
    verify: async (password,repassword) => {
            var compare = await bcrypt.compare(password,repassword)
            return compare
    },
    token:async (token)=>{
            await jwt.verify(token, process.env.TOKEN_SECRET,function(err, decoded) {
            if (err) {
              
                err = {
                  name: 'TokenExpiredError',
                  message: 'jwt expired',
                  expiredAt: 1408621000
                }
              return err
            }else {
              return decoded
            }
          })
    },
    retoken: (user) =>{
      return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {"uid":user}
      }, process.env.TOKEN_SECRET);
        //return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    },
    makeUsernameKey:  (username) => {
      const usernameKey = `username:${username}`;
      return usernameKey;
    },
    createUser: async (username, password) => {
      const usernameKey =  `username:${username}`;
      /** Create user */
      const hashedPassword = await bcrypt.hash(password, 10);
      const nextId = await incr("total_users");
      const userKey = `user:${nextId}`;
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {"uid":nextId}
      }, process.env.TOKEN_SECRET);
      await set(usernameKey, userKey);
      await hmset(userKey, ["username", username, "password", hashedPassword]);
    
      /**
       * Each user has a set of rooms he is in
       * let's define the default ones
       */
      await sadd(`user:${nextId}:rooms`, `${0}`); // Main room
    
      /** This one should go to the session */
      return { id: nextId, username,token };
    },
    getPrivateRoomId: (user1, user2) => {
      if (isNaN(user1) || isNaN(user2) || user1 === user2) {
        return null;
      }
      const minUserId = user1 > user2 ? user2 : user1;
      const maxUserId = user1 > user2 ? user1 : user2;
      return `${minUserId}:${maxUserId}`;
    },
    createPrivateRoom: async (user1, user2) => {
      const roomId = getPrivateRoomId(user1, user2);
    
      if (roomId === null) {
        return [null, true];
      }
    
      /** Add rooms to those users */
      await sadd(`user:${user1}:rooms`, `${roomId}`);
      await sadd(`user:${user2}:rooms`, `${roomId}`);
    
      return [{
        id: roomId,
        names: [
          await hmget(`user:${user1}`, "username"),
          await hmget(`user:${user2}`, "username"),
        ],
      }, false];
    },
    getMessages: async (roomId = "0", offset = 0, size = 50) => {
      /**
       * Logic:
       * 1. Check if room with id exists
       * 2. Fetch messages from last hour
       **/
      const roomKey = `room:${roomId}`;
      const roomExists = await exists(roomKey);
      if (!roomExists) {
        return [];
      } else {
        return new Promise((resolve, reject) => {
          redisClient.zrevrange(roomKey, offset, offset + size, (err, values) => {
            if (err) {
              reject(err);
            }
            resolve(values.map((val) => JSON.parse(val)));
          });
        });
      }
    },
    sanitise: (text) => {
      let sanitisedText = text;
    
      if (text.indexOf('<') > -1 || text.indexOf('>') > -1) {
        sanitisedText = text.replace(/</g, '&lt').replace(/>/g, '&gt');
      }
    
      return sanitisedText;
    }
    
    
    
    
}