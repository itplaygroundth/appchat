
var EventEmitter = require('events').EventEmitter;
var proto = require('./application');
var mixin = require('merge-descriptors');
 

function createApplication() {
  var app = function(req, res, next) {
    app.fastify.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);
 

  app.init();
  return app;
}
exports = module.exports = createApplication;
exports.application = proto;
 