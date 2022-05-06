// import createFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
// import fastifyCookie from 'fastify-cookie';
// import RedisStore from '@mgcrea/fastify-session-redis-store';
// import fastifySession from '@mgcrea/fastify-session';
// import Redis from 'ioredis';

//const { default: fastifyEnv } = require('@fastify/env')

// import { IS_PROD, IS_TEST, REDIS_URI, SESSION_TTL } from './config/env';
//const app = require('./fastx')()


// const SESSION_TTL = 864e3; // 1 day in seconds
// const client = new Redis({
//   port: port, // Redis port
//   host: host, // Redis host
//   username: "default", // needs Redis >= 6
//   password: password,
//   db: 0, // Defaults to 0
// });
//console.log(app)
//app.listen()
// export const buildFastify = (options?: FastifyServerOptions): FastifyInstance => {
//   const fastify = createFastify(options);

//   fastify.register(fastifyCookie);
//   fastify.register(fastifySession, {
//     store: new RedisStore({ client: new Redis(REDIS_URI), ttl: SESSION_TTL }),
//     secret: 'a secret with minimum length of 32 characters',
//     cookie: { maxAge: SESSION_TTL },
//   });

//   return fastify;
// };
const app = require('./fastx')()
app.cors()
app.use(require('./routes/app'))




try {
  app.listen()  
} catch (error) {
}











