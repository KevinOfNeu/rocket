var qiniu = require('qiniu');
var db = require('../db/index');
var util = require('../util');
var Promise = require('promise');

var bucket = '';
var domain = '';

function generateUploadtoken(bucket, cloudFileName) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + cloudFileName);
  return putPolicy.token();
}

module.exports = {
  init: function () {
    return new Promise(function (resolve, reject) {
      db.getInstance().find({
        bucket: {$exists: true},
        secretKey: {$exists: true},
        accessKey: {$exists: true}
      }, function (err, docs) {
        if (err || !docs || docs.length === 0) {
          util.logError('No cloud config found! \n');
          util.logError('Use config -h for help\n');
          reject('Cannot find config ');
        } else {
          var cloudConfig = docs[0];
          qiniu.conf.ACCESS_KEY = cloudConfig.accessKey;
          qiniu.conf.SECRET_KEY = cloudConfig.secretKey;
          bucket = cloudConfig.bucket;
          domain = cloudConfig.domain;
          return resolve();
        }
      });
    });
  },
  upload: function (cloudFileName, locaFile) {
    return new Promise(function (resolve, reject) {
      var extra = new qiniu.io.PutExtra();
      qiniu.io.putFile(generateUploadtoken(bucket, cloudFileName), cloudFileName, locaFile, extra, function (err, ret) {
        if (!err) {
          return resolve(ret);
        } else {
          return reject(err);
        }
      }).on('error', function () {});
    });
  },
  download: function () {
    return new Promise(function (resolve, reject) {
      var policy = new qiniu.rs.GetPolicy();
      var downloadUrl = policy.makeRequest(domain);
      if (downloadUrl) {
        resolve(downloadUrl);
      } else {
        reject();
      }
    });
  }
};
