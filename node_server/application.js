//import createFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';

const fastify = require('fastify')({
    logger: true,
    ignoreTrailingSlash: true 
  }),
fastifyEnv = require('@fastify/env'),
schema = require('./schema');


const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');
const RedisStore = require('connect-redis')(fastifySession);
const Redis =require('ioredis');
var mixin = require('merge-descriptors');


var app = exports = module.exports = { };

var enable_cors = false

 
  
 
  
  const initialize = async () => {
    fastify.register(fastifyEnv, {
        confKey: 'config',
        schema,
        dotenv: true,
        data: process.env
      })
    await fastify.after()
    fastify.register(
        import('@fastify/compress'),
        { global: false }
      );
    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
        store: new RedisStore({ client: new Redis({
            host: fastify.config.REDIS_MASTER_HOST,
            port: fastify.config.REDIS_MASTER_PORT,
            password: fastify.config.REDIS_MASTER_PASSWORD 
        }), ttl: fastify.config.SESSION_TTL }),
        cookieName: 'sesId',
        secret: fastify.config.TOKEN_SECRET,
        cookie: { maxAge: fastify.config.SESSION_TTL },
    });
    
    
    //if(enable_cors)
    fastify.register(require('@fastify/cors'),function (instance) {

        return (req, callback) => {
          let corsOptions;
          var allowlist = JSON.parse(fastify.config.WHITELIST);
          const origin = req.headers.origin
          // do not include CORS headers for requests from localhost
          //const hostname = new URL(origin).hostname
          if (allowlist.indexOf(origin) !== -1) {
            corsOptions = { origin: false}
                // allowedHeaders: [
                //     'Access-Control-Allow-Origin',
                //     'Origin',
                //     'X-Requested-With',
                //     'Accept',
                //     'Content-Type',
                //     'Authorization',
                //   ],
                //   exposedHeaders: 'Authorization',
                //   credentials: true,
                //   methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'] }
          } else {
            corsOptions = { origin: true }
          }
            callback(null, corsOptions) // callback expects two parameters: error and options
         
          

        }
      })
 
  }
 
 
app.listen = async function listen(){
    try {
        await initialize()
        await fastify.ready()
        await fastify.listen(fastify.config.PORT,'0.0.0.0')
        return fastify
      } catch (error) {
        fastify.log.error(error)
        process.exit(1)
      }
}
app.cors = async function cors(active=true){
    enable_cors = active
}
app.use = async function use(route){
    fastify.register(route)
}

app.init = async function init(){
    this.cache = {};
    this.engines = {};
    this.settings = {};
  
    this.defaultConfiguration();
}

app.defaultConfiguration = function defaultConfiguration() {
    var env = process.env.NODE_ENV || 'development';
    
}
 