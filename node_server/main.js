const http = require('http'),
  express = require('express'),
  app = express(),
  { Router } = express,
  server = http.createServer(app),
  io = require('socket.io')(server,{
    cors: {
        origin: ["http://localhost:3000","https://uefabot.com"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
      }
  })
  

require('dotenv').config()
const port = 3002 || process.env.PORT
const host = "http://localhost" || process.env.URL_API
const { channel } = require('diagnostics_channel');
const Redis = require("ioredis");
const sub = new Redis({
  host:process.env.REDIS_MASTER_HOST,
  port:process.env.REDIS_MASTER_PORT,
  password:process.env.REDIS_MASTER_PASSWORD,
  db:0
});


// var pub = redis.createClient();
// var sub = redis.createClient();

// sub.on("subscripbe",(channel,count)=>{
//   console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
// });

// sub.on("message", (channel, message)=> {
//     console.log("Message from channel " + channel + ": " + message);
// });

// setInterval(function() {
//   var no = Math.floor(Math.random() * 100);
//   pub.publish('tungns', 'Generated Chat random no ' + no);
// }, 5000);

//sub.subscribe("tungns");
// Store people in chatroom
var chatters = [];

// Store messages in chatroom
var chat_messages = [];


async function start() {
  
  app.use(express.json()) // Receive Header: Content-Type: application/json
  app.use(express.urlencoded({ extended: false })) // Parse Body to JSON

  sub.on("message", async (channel, data)=> {
    data = await JSON.parse(data);

    //io.to(channel).emit(data.method, data.data);
    //io.to(channel).emit(data.method,data.data)
    //await io.emit(data.method, data.data);
    console.log("Message from channel " + channel + ": " + data.method);
    io.to('/index').emit("hello", "world");
    //socket.emit('listUsers', "to client which has same socket.id");
    //io.to('index').emit('listUsers', "Message from channel " + channel + ": " + data.method);
    //io.sockets.in(channel).emit(data.method, data.data);
  });

  
  //sub.subscribe("index");
  //app.use(nuxt.render)
  
  io.of("/index").on("connection", socket => {
    sub.on("subscribe", function(channel, count) {
      //console.log(count)
      console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
    });
    sub.subscribe("index");
  
    //socket.emit("welcome", "This is the Sunshine Callcenter Support");
    //socket.on('getUsers',async (data)=>sub.subscribe(data))
    
  })
  
  // Listen the server
  server.listen(port,()=>{
  console.log({
    message: `Server listening on ${host}:${port}`,
    badge: true
  })
})
}

start()