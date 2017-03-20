'use strict';
var addHandler = require('./AddHandler');
var pushHandler = require('./PushHandler');
var configHandler = require('./ConfigHandler');
var initHandler = require('./InitHandler');
var lsHandler = require('./LsHandler');
var pullHandler = require('./PullHandler');

module.exports = {
  handleAdd: function (options) {
    return addHandler.handle(options);
  },
  handlePush: function (options) {
    return pushHandler.handle(options);
  },
  handleLs: function (options) {
    return lsHandler.handle(options);
  },
  handlePull: function (key, options) {
    return pullHandler.handle(key, options);
  },
  handleInit: function (options) {
    return initHandler.handle(options);
  },
  handleConfig: function (cmd, options) {
    return configHandler.handle(cmd, options);
  }
};
