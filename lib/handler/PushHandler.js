var Promise = require('promise');
var db = require('../db/index');
var ora = require('ora');
var qiniuWrapper = require('../provider/Qiniu');
var moment = require('moment');
var util = require('../util');
var path = require('path');

var thunk = require('thunks')();
var thunkWorkers = require('thunk-workers');
var workshop;

function excuteUploadTasks(item) {
  workshop(function () {
    var spinner = ora('[PUSH] ' + item.path + ' ').start();
    return new Promise(function (resolve, reject) {
      qiniuWrapper.upload(path.join(item.query.dir, item.file), item.path)
        .then(function (ret) {
          item.cloud = {
            key: ret.key,
            hash: ret.hash,
            upload_at: moment().format('lll')
          };
          spinner.succeed();
          return resolve(item);
        })
        .catch(function (err) {
          spinner.fail();
          return reject(err);
        });
    });
  })(function (err, retItem) {
    if (!err) {
      syncBack2Index(retItem);
    }
  })
}

module.exports = {
  handle: function (options) {
    return new Promise(function (resolve, reject) {
      workshop = thunkWorkers(options.maxWorkers || 5);
      db.getInstance().find({
        path: {$exists: true},
        file: {$exists: true},
        "cloud.hash": "",
        "cloud.key": ""
      }, function (err, docs) {
        if (docs && docs.length > 0) {
          qiniuWrapper.init()
            .then(function () {
              docs.forEach(function (item) {
                excuteUploadTasks(item);
              });
            })
            .catch(function (err) {
              return reject(err);
            });
        } else {
          return reject('Noting needed to push! \n');
        }
      });
    });
  }
};

function syncBack2Index(item) {
  var spinner = ora('[UPDATE INDEX] ' + item.path + ' ').start();
  db.getInstance().update({
    _id: item._id
  }, {
    $set: {
      'cloud.key': item.cloud.key,
      'cloud.hash': item.cloud.hash,
      'cloud.upload_at': item.cloud.upload_at
    }
  }, {}, function (err, numReplaced) {
    if (err) {
      util.logError(err);
    }
  });
  spinner.succeed();
}
