var Promise = require('promise');
var fs = require('fs');
var path = require('path');
var util = require('../util');
var db = require('../db/index');
var ora = require('ora');
var moment = require('moment');
var cuid = require('cuid');

module.exports = {
  handle: function (options) {
    return new Promise(function (resolve, reject) {
      var dir = options.dir;
      var recursive = options.recursive;
      var filter = options.filter;
      var ret = parseDir(dir, recursive, filter);
      if (ret.length === 0) reject('No math found in ' + dir + '\n');
      var result = ret.filter(function (item) {
        var reg = new RegExp(filter);
        return reg.test(item.file);
      });
      if (result && result.length > 0) {
        var parsedItems = [];
        var spinner = ora('Adding file(s) to index').start();
        result.forEach(function (item, index) {
          item.cloud = {
            key: '',
            hash: '',
            upload_at: ''
          };
          item.created_at = moment().format('lll');
          item._id = cuid();
          parsedItems.push(item);
        });
        db.getInstance().insert(parsedItems, function (err, newDoc) {
          if (err) {
            spinner.fail();
          } else {
            spinner.succeed();
          }
        });
      } else {
        reject('No math found in ' + dir + ' with filter:' + filter + '\n');
      }
      resolve('');
    });
  }
};

function parseDir(dir, recursive, filter) {
  util.logSuccess('Start parsing files in ' + dir);
  var ret = [];
  var list = fs.readdirSync(dir);
  if (!list || list.length === 0) {
    return ret;
  }
  if (!recursive) {
    list.forEach(function (file) {
      var fullPathFile = path.resolve(dir, file);
      var stat = fs.statSync(fullPathFile);
      if (stat && stat.isFile()) {
        ret.push(
          {
            path: fullPathFile,
            file: file,
            query: {
              dir: dir,
              recursive: false,
              filter: filter
            },
            meta: {
              size: stat.size
            }
          }
        );
      }
    });
    return ret;
  } else {
    // parse files and path recursively
    return scanRecursive(dir, filter);
  }

}

var scanRecursive = function (dir, filter) {
  var result = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    var fullPath = path.resolve(dir, file);
    var joinedFile = path.join(dir, file);
    var stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      result = result.concat(scanRecursive(joinedFile, filter));
    } else {
      result.push({
        path: fullPath,
        file: file,
        query: {
          dir: dir,
          recursive: true,
          filter: filter
        },
        meta: {
          size: stat.size
        }
      });
    }
  });
  return result;
};
