'use strict';
var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var CONFIG_FILE = '/.rocket.json';
var colors = require('colors');

module.exports = {
  LOCAL_DB: homeDir + CONFIG_FILE,
  logSuccess: function (string) {
    console.log(colors.green(string));
  },
  logError: function (string) {
    console.log(colors.red(string));
  }
};
