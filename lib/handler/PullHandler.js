var Promise = require('promise');
var qiniuWrapper = require('../provider/Qiniu');
var ora = require('ora');
var db = require('../db/index');
var download = require('download-to-file');
var path = require('path');

module.exports = {
  handle: function (key, options) {
    return new Promise(function (resolve, reject) {
      db.getInstance().find({
        $or: [
          {file: key},
          {'cloud.hash': key}
        ]
      }, function (err, docs) {
        if (err || docs === null || docs.length === 0) {
          return reject('No match file find');
        } else {
          var file = docs[0];
          var destDir = options.dest ? path.resolve(options.dest, file.file) : file.path;
          var spinner = ora('[PULL] ' + file.file + ' from cloud').start();
          qiniuWrapper.init()
            .then(function () {
              qiniuWrapper.download(file.cloud.key)
                .then(function (res) {
                  download(res, destDir, function (err) {
                    if (err) {
                      spinner.fail();
                      return reject(err);
                    } else {
                      spinner.succeed();
                      return resolve('Download file to  ' + destDir + ' succeed! \n');
                    }
                  });
                })
                .catch(function (err) {
                  spinner.fail();
                  return reject('Download file failed!');
                });
            });
        }
      });
    });
  }
};
