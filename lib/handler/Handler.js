'use strict';
var addHandler = require('./AddHandler');
var pushHandler = require('./PushHandler');
var configHandler = require('./ConfigHandler');
var doctorHandler = require('./DoctorHandler');
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
  handleDoctor: function (options) {
    return doctorHandler.handle(options);
  },
  handleLs: function (options) {
    return lsHandler.handle(options);
  },
  handlePull: function (options) {
    return pullHandler.handle(options);
  },
  handleInit: function (options) {
    return initHandler.handle(options);
  },
  handleConfig: function (options) {
    return configHandler.handle(options);
  }
};
