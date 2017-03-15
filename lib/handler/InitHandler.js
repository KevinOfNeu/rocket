var Promise = require('promise');
var fs = require('fs');
var util = require('../util');

module.exports = {
  handle: function (options) {
    return new Promise(function (resolve, reject) {
      if (options.overwrite) {
        fs.writeFile(util.LOCAL_DB, '', function (err) {
          if (err) {
            reject(' overwrite ' + util.LOCAL_DB + 'failed!');
          } else {
            resolve('overwrite ' + util.LOCAL_DB + ' succeed!');
          }
        });
      } else {
        fs.exists(util.LOCAL_DB, function (exists) {
          if (exists) reject(util.LOCAL_DB + ' already exist, overwrite old file use -o (-overwrite) options');
        });
      }
    });
  }
};
