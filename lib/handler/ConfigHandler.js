var Promise = require('promise');
var db = require('../db/index');
module.exports = {
  handle: function (options) {
    return new Promise(function (resolve, reject) {
      if (!options.bucket || !options.accessKey || !options.secretKey) {
        reject('Bucket, AccessKey and SecretKey must be provided! \nUse -h for help.');
      } else {
        var qiniuConfig = {
          bucket: options.bucket,
          accessKey: options.accessKey,
          secretKey: options.secretKey,
          domain: options.domain
        };
        db.getInstance().update({
          bucket: {$exists: true},
          accessKey: {$exists: true},
          secretKey: {$exists: true},
          domain: {$exists: true}
        }, qiniuConfig, {upsert: true}, function (err, numReplaced) {
          if (err) {
            reject('Upsert config failed!');
          } else {
            resolve('Upsert config succeed!');
          }
        });
      }
    });
  }
};
