var Promise = require('promise');
var db = require('../db/index');
module.exports = {
  handle: function (cmd, options) {
    return new Promise(function (resolve, reject) {
      if (cmd === 'show') {
        db.getInstance().find({
          bucket: {$exists: true},
          accessKey: {$exists: true},
          secretKey: {$exists: true},
          domain: {$exists: true}
        }, function (err, docs) {
          if (err || docs === null || docs.length === 0) {
            return reject('No config find!');
          } else {
            var config = docs[0];
            var ret = '';
            ret += 'bucket: ' + config.bucket + '\n';
            ret += 'accessKey: ' + config.accessKey + '\n';
            ret += 'secretKey: ' + config.secretKey + '\n';
            ret += 'domain: ' + config.domain + '\n';
            return resolve(ret);
          }
        });
      } else {
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
              return reject('Config failed!');
            } else {
              return resolve('Config succeed!');
            }
          });
        }
      }
    });
  }
};
