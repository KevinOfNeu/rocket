var Promise = require('promise');
var packageInfo = require('../../package.json');
module.exports = {
  handle: function (options) {
    return new Promise(function (resolve, reject) {
      resolve('Unimplemented yet! PR Welcomed! Refer to ' + packageInfo.homepage)
    });
  }
};
