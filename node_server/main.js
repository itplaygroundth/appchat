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
async function start() {
    
  app.use(express.json()) // Receive Header: Content-Type: application/json
  app.use(express.urlencoded({ extended: false })) // Parse Body to JSON
  //app.use(nuxt.render)
  io.of("/index").on("connection", socket => {
    //Welcome new joiners!
    socket.emit("welcome", "This is the Gaming Channel!");
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